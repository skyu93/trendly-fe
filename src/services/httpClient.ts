import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { TokenStorage } from '@/services/tokenStorage';
import { ApiError } from '@/services/apiError';
import { ERROR_CODES } from '@/constants/errorCodes';
import { API_PATH } from '@/constants/apiPath';
import { AuthResponse } from '@/services/auth/authService.type';

const getBaseUrl = () => {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'production':
      return 'https://trendly.kr';
    case 'development':
      return 'http://54.180.63.180:8080';
    default:
      return 'http://54.180.63.180:8080';
  }
};

// 토큰 리프레시 중인지 확인하는 변수
let isRefreshing = false;
// 리프레시 토큰 요청 중에 대기 중인 요청들을 저장하는 큐
let refreshSubscribers: ((token: string) => void)[] = [];

// 리프레시 토큰으로 새 액세스 토큰 요청
const refreshAccessToken = async (): Promise<string> => {
  try {
    const { refreshToken } = TokenStorage.getAuthData() ?? { refreshToken: '' };

    if (!refreshToken) {
      throw new Error('리프레시 토큰이 없습니다.');
    }

    const response = await Api.post<AuthResponse>(
      API_PATH.REFRESH_TOKEN,
      { refreshToken },
      {
        headers: { skipAuth: true },
      },
    );

    const { accessToken, refreshToken: newRefreshToken, refreshTokenExpiresIn } = response.data;

    // 새 토큰 저장
    TokenStorage.setToken({
      accessToken,
      refreshToken: newRefreshToken,
      refreshExpiresAt: refreshTokenExpiresIn,
    });

    return accessToken;
  } catch (error) {
    // 리프레시 토큰도 만료된 경우
    console.error(error);
    TokenStorage.clearToken();
    throw new ApiError({
      code: ERROR_CODES.TOKEN_INVALID,
    });
  }
};

// 토큰 갱신 후 대기 중인 요청들 처리
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

// 리프레시 토큰 요청 중 대기할 프로미스 생성
const addSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const Api: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
Api.interceptors.request.use(
  config => {
    const authorization = TokenStorage.getAuthHeader();

    if (authorization && !config.headers?.skipAuth) {
      config.headers.Authorization = authorization;
    }

    if (config.headers?.skipAuth) {
      delete config.headers.skipAuth;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
Api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response) {
      const { message } = error;
      const { status } = error.response;

      // 액세스 토큰 만료 (401)
      if (status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // 이미 리프레시 토큰 요청 중이면 대기
          return new Promise(resolve => {
            addSubscriber((token: string) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axios(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshAccessToken();

          // 대기 중인 요청들에게 새 토큰 전달
          onRefreshed(newToken);

          // 원래 요청 재시도
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (error) {
          // 리프레시 토큰 갱신 실패 처리
          console.error(error);
          TokenStorage.clearToken();
          return Promise.reject(
            new ApiError({
              code: ERROR_CODES.TOKEN_INVALID,
            }),
          );
        } finally {
          isRefreshing = false;
        }
      } else if (status === 403) {
        TokenStorage.clearToken();
        return Promise.reject(
          new ApiError({
            code: ERROR_CODES.FORBIDDEN,
            message,
          }),
        );
      }
    }

    return Promise.reject(error);
  },
);

export default Api;

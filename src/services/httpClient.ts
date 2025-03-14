import axios, { AxiosInstance, AxiosError } from 'axios';
import { TokenStorage } from '@/services/tokenStorage';
import { ApiError } from '@/services/apiError';
import { ERROR_CODES } from '@/constants/errorCodes';

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
    if (error.response) {
      const { message } = error;
      const { status } = error.response;
      if (status === 401) {
        TokenStorage.clearToken();
        return Promise.reject(
          new ApiError({
            code: ERROR_CODES.TOKEN_INVALID,
            message,
          }),
        );
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

import { AuthResponse, LoginRequestQueryParams } from '@/services/auth/authService.type';
import { isNil } from 'es-toolkit/compat';

export class AuthApi {
  static login = async (queryParams: LoginRequestQueryParams): Promise<AuthResponse> => {
    //TODO: 테스트 코드
    if (isNil(queryParams)) {
    }
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          accessToken:
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b3VsZWVuYW5nQG5hdmVyLmNvbSIsImlhdCI6MTc0MTE5MDk1MCwiZXhwIjoxNzQxMTkwOTgwfQ.8KtX9DfEWhcIQQtOU620BmHLUenadi4TRNNxFdd4BgA',
          refreshToken:
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b3VsZWVuYW5nQG5hdmVyLmNvbSIsImlhdCI6MTc0MTE5MDk1MCwiZXhwIjoxNzQxMTkxMDEwfQ.h0qcAxP-1EC2O-yglq4xDLbg5qzq11FgadJ5PenM7hw',
          accessTokenExpiresIn: 1743465599000,
          refreshTokenExpiresIn: 1743465599000,
          tokenType: 'Bearer',
          newUser: true,
          user: {
            id: 1,
            email: 'test@trendly.com',
            birthDate: null,
            gender: null,
            marketingOpt: false,
            createDate: '2025-03-06T01:09:10.2999019',
            modifiedDate: '2025-03-06T01:09:10.2999019',
          },
        });
      }, 300);
    });
    // const { data } = await Api.get<AuthResponse>(`${API_PATH.LOGIN}?code=${code}&redirect_uri=${redirectUri}`, {
    //   headers: { skipAuth: true },
    // });
    // return data;
  };

  static logout = async (): Promise<void> => {
    //await Api.get(API_PATH.LOGOUT);
  };
}

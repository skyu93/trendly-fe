import { AuthResponse, LoginRequestQueryParams } from '@/services/auth/authService.type';
import Api from '@/services/httpClient';
import { API_PATH } from '@/constants/apiPath';

export class AuthApi {
  static login = async (queryParams: LoginRequestQueryParams): Promise<AuthResponse> => {
    const { code, redirectUri } = queryParams;
    const { data } = await Api.get<AuthResponse>(`${API_PATH.LOGIN}?code=${code}&redirect_uri=${redirectUri}`, {
      headers: { skipAuth: true },
    });
    return data;
  };

  static logout = async (): Promise<void> => {
    await Api.post(API_PATH.LOGOUT);
  };
}

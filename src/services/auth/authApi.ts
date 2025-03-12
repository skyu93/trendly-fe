import { API_PATH } from '@/constants/apiPath';
import { AuthResponse, LoginRequestQueryParams } from '@/services/auth/authService.type';
import Api from '@/services/httpClient';

export class AuthApi {
  static login = async (queryParams: LoginRequestQueryParams): Promise<AuthResponse> => {
    const { code, redirectUri } = queryParams;
    const { data } = await Api.get<AuthResponse>(`${API_PATH.LOGIN}?code=${code}&redirect_uri=${redirectUri}`);
    return data;
  };

  static logout = async (): Promise<void> => {
    await Api.get(API_PATH.LOGOUT);
  };
}

import { UserInfo } from '@/services/user/user.type';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  tokenType: string;
  user: UserInfo;
}

export interface LoginRequestQueryParams {
  code: string;
  redirectUri: string;
}

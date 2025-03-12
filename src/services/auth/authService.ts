import { UserInfo } from '@/services/user/user.type';
import { AuthApi } from '@/services/auth/authApi';
import { TokenStorage } from '@/services/tokenStorage';
import { ApiError } from '@/services/apiError';
import { ERROR_CODES } from '@/constants/errorCodes';

class AuthService {
  private readonly KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize';
  private readonly KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;

  constructor() {}

  public getLoginPageUrl(): string {
    const redirectUri = this.getRedirectUri();
    return `${this.KAKAO_AUTH_URL}?response_type=code&client_id=${this.KAKAO_CLIENT_ID}&redirect_uri=${redirectUri}`;
  }

  private getRedirectUri(): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/auth`;
  }

  public async login(code: string): Promise<UserInfo> {
    try {
      const { accessToken, refreshToken, accessTokenExpiresIn, user } = await AuthApi.login({
        code,
        redirectUri: this.getRedirectUri(),
      });

      TokenStorage.setToken({
        token: accessToken,
        refreshToken,
        expiresIn: accessTokenExpiresIn,
      });

      return user;
    } catch (error) {
      throw new ApiError({
        code: ERROR_CODES.LOGIN_FAILED,
        error,
      });
    }
  }

  public async logout(): Promise<void> {
    await AuthApi.logout();
    TokenStorage.clearToken();
  }

  public isAuthenticated(): boolean {
    return TokenStorage.isTokenValid();
  }
}

// auth-service 사용 예시
export default AuthService;

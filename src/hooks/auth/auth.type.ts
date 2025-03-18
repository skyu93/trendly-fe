import { UserInfo } from '@/services/user/user.type';

export interface AuthState {
  user: UserInfo | null;
  isLoading: boolean;
  isLogout: boolean;
}

export interface AuthAction {
  setUser(user: UserInfo | null): void;
  isAuthenticated(): boolean;
  getLoginPageUrl(): string;
  getToken(code: string): Promise<{ isNewUser?: boolean }>;
  logout(): void;
  setLoading(loading: boolean): void;
  reloadAuthData(): boolean;
}

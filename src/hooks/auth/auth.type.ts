import { UserInfo } from '@/services/user/user.type';

export interface AuthState {
  user: UserInfo | null;
  isLoading: boolean;
}

export interface AuthAction {
  setUser(user: UserInfo | null): void;
  isAuthenticated(): boolean;
  getLoginPageUrl(): string;
  getToken(code: string): Promise<void>;
  logout(): void;
  setLoading(loading: boolean): void;
  renewAuth(): boolean;
}

import { UserInfo } from '@/services/user/user.type';

export interface AuthState {
  user: UserInfo | null;
  isLoading: boolean;
}

export interface AuthAction {
  isAuthenticated(): boolean;
  getLoginPageUrl(): string;
  getToken(code: string): Promise<void>;
  logout(): void;
  setLoading(loading: boolean): void;
}

import { UserInfo, UserUpdateRequest } from '@/services/user/user.type';

export interface UserState {
  user: UserInfo | null;
  isLoading: boolean;
  isLogout: boolean;
}

export interface UserAction {
  isLogin(): boolean;
  isAuthenticated(): boolean;
  getLoginPageUrl(): string;
  login(code: string): Promise<{ isNewUser?: boolean }>;
  logout(): void;
  updateInfo(params: UserUpdateRequest): Promise<void>;
  deleteAccount(): Promise<void>;
  refreshAuthState(): Promise<boolean>;
}

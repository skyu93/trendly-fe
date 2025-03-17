import { create } from 'zustand';
import { AuthAction, AuthState } from '@/hooks/auth/auth.type';
import AuthService from '@/services/auth/authService';
import { UserInfo } from '@/services/user/user.type';
import { isNil } from 'es-toolkit/compat';
import UserService from '@/services/user/userService';

export const useAuth = create<AuthState & AuthAction>((set, get) => {
  const authService = new AuthService();
  const userService = new UserService();
  return {
    user: null,
    isLoading: false,
    isLogout: false,
    setUser(user: UserInfo | null) {
      set({ user });
    },
    isAuthenticated() {
      return authService.isAuthenticated();
    },
    getLoginPageUrl(): string {
      return authService.getLoginPageUrl();
    },
    getToken: async (code: string): Promise<{ isNewUser?: boolean }> => {
      set({ isLoading: true });
      try {
        const { isNewUser, user } = await authService.login(code);
        set({ isLoading: false, isLogout: false, user });
        return { isNewUser };
      } finally {
        set({ isLoading: false });
      }
    },
    logout: () => {
      authService.logout(); // 로그아웃 처리
      set({ user: null, isLogout: true });
    },
    setLoading: loading => set({ isLoading: loading }),
    reloadAuthData: () => {
      const authData = authService.getAuthData();
      const { user, isLogout } = get();
      if (isNil(authData) || isLogout) {
        return false;
      }
      if (isNil(user)) {
        userService.getUserInfo().then(user => {
          set({ user });
        });
      }
      return true;
    },
  };
});

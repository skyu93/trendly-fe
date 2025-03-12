import { create } from 'zustand/react';
import { AuthAction, AuthState } from '@/hooks/auth/auth.type';
import AuthService from '@/services/auth/authService';

export const useAuth = create<AuthState & AuthAction>(set => {
  const authService = new AuthService();
  return {
    user: null,
    isLoading: false,
    isAuthenticated() {
      return authService.isAuthenticated();
    },
    getLoginPageUrl(): string {
      return authService.getLoginPageUrl();
    },
    getToken: async (code: string): Promise<void> => {
      set({ isLoading: true });
      try {
        const user = await authService.login(code);
        set({ isLoading: false, user });
      } finally {
        set({ isLoading: false });
      }
    },
    logout: () => {
      authService.logout(); // 로그아웃 처리
      set({ user: null });
    },
    setLoading: loading => set({ isLoading: loading }),
  };
});

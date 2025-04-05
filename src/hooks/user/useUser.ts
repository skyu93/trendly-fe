import { create } from 'zustand';
import { UserAction, UserState } from '@/hooks/user/user.type';
import AuthService from '@/services/auth/authService';
import { UserUpdateRequest } from '@/services/user/user.type';
import { isEmpty, isNil } from 'es-toolkit/compat';
import UserService from '@/services/user/userService';

export const useUser = create<UserState & UserAction>((set, get) => {
  const authService = new AuthService();
  const userService = new UserService();
  return {
    user: null,
    isLoading: false,
    isLogout: false,
    isLogin() {
      const { accessToken } = authService.getAuthData();
      return !isEmpty(accessToken);
    },
    isAuthenticated() {
      return authService.isAuthenticated();
    },
    getLoginPageUrl(): string {
      return authService.getLoginPageUrl();
    },
    login: async (code: string): Promise<{ isNewUser?: boolean }> => {
      set({ isLoading: true });
      try {
        const { isNewUser, user } = await authService.login(code);
        set({ user });
        return { isNewUser };
      } catch (error) {
        throw error;
      } finally {
        set({ isLoading: false, isLogout: false });
      }
    },
    logout: () => {
      set({ isLogout: true });
      authService.logout();
      set({ user: null });
    },
    updateInfo: async ({ gender, birthDate, marketingOpt }: UserUpdateRequest) => {
      set({ isLoading: true });
      try {
        const user = await userService.update({ gender, birthDate, marketingOpt });
        set({ user });
      } catch (error) {
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },
    deleteAccount: async () => {
      set({ isLoading: true });
      try {
        await userService.delete();
      } catch (error) {
        throw error;
      } finally {
        set({ user: null, isLoading: false });
      }
    },
    refreshAuthState: async () => {
      const { user, isLogout } = get();
      const { accessToken } = authService.getAuthData();

      // 토큰이 없거나 인증되지 않은 경우
      if (isEmpty(accessToken) || !authService.isAuthenticated()) {
        return false;
      }

      if (isNil(user) && !isLogout) {
        try {
          const user = await userService.getUserInfo();
          set({ user });
        } catch (error) {
          console.error(error);
          return false; // 사용자 정보 로드 실패 시 false 반환
        }
      }
      return true;
    },
  };
});

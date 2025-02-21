import { create } from 'zustand/react';
import { AuthState } from '@/types/auth.type';

const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize';
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '';
const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? '';

export const useAuth = create<AuthState>(set => ({
  isLoading: false,
  error: null,
  getAuthUrl: (() => {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
    });
    return `${KAKAO_AUTH_URL}?${params.toString()}`;
  })(),
  getToken: async (code: string): Promise<string> => {
    set({ isLoading: true, error: null });
    try {
      const token = `Bearer TOKEN ${code}`;
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(token);
        }, 1000);
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다.');
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  setLoading: loading => set({ isLoading: loading }),
  setError: error => set({ error }),
}));

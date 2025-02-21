import { create } from 'zustand/react';
import { SplashState } from '@/types/splash.type';

export const useSplash = create<SplashState>(set => ({
  isSplashVisible: false,
  showSplash: () => set({ isSplashVisible: true }),
  hideSplash: () => set({ isSplashVisible: false }),
}));

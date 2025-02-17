import { create } from 'zustand/react';
import { AppState } from '@/hooks/app-state/appState.type';

export const useAppState = create<AppState>(() => ({
  isLoadedApp: false
}))

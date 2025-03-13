import { create } from 'zustand/react';

interface MarketingConsentState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useMarketingConsent = create<MarketingConsentState>(set => ({
  isOpen: false,
  setOpen: (open: boolean) => set({ isOpen: open }),
}));

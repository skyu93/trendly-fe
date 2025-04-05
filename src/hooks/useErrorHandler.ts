import { create } from 'zustand';
import { ApiError } from '@/services/apiError';
import { AxiosError } from 'axios';
import { isNotNil } from 'es-toolkit';

type ErrorInstance = ApiError | AxiosError | Error | unknown;

interface ErrorState {
  error: ErrorInstance | null;
  isError: boolean;
  setError: (error: ErrorInstance | null) => void;
  handleError: (errorInstance: ErrorInstance | null) => void;
  reset: () => void;
}

export const useErrorHandler = create<ErrorState>(set => ({
  error: null,
  isError: false,

  setError: (errorInstance: ErrorInstance | null) => {
    set({
      error: errorInstance,
      isError: isNotNil(errorInstance),
    });
  },

  handleError: (errorInstance: ErrorInstance | null) => {
    set({
      error: errorInstance,
      isError: isNotNil(errorInstance),
    });
  },

  reset: () => {
    set({
      error: null,
      isError: false,
    });
  },
}));

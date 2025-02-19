export interface AuthState {
  isLoading: boolean;
  error: Error | null;
  getAuthUrl: string;
  getToken: (code: string) => Promise<string>;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

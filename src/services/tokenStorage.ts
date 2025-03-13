import dayjs from 'dayjs';
import { UserInfo } from '@/services/user/user.type';

interface AuthData {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  user: UserInfo | null;
}

export const TokenStorage = (() => {
  const tokenType = 'Bearer';
  let accessToken: string | null = null;
  let refreshToken: string | null = null;
  let expiresAt: dayjs.Dayjs | null = null;
  let user: UserInfo | null = null;
  let isInitialized = false;

  const encrypt = (data: string): string => {
    return btoa(encodeURIComponent(data));
  };

  const decrypt = (encryptedData: string): string => {
    try {
      return decodeURIComponent(atob(encryptedData));
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const isBrowser = (): boolean => {
    return typeof window !== 'undefined';
  };

  const saveToStorage = (): void => {
    if (!isBrowser() || !accessToken || !expiresAt) return;

    try {
      const authData = JSON.stringify({
        accessToken,
        refreshToken,
        expiresAt: expiresAt ? expiresAt.valueOf() : 0,
        user,
      });

      localStorage.setItem('trendly', encrypt(authData));
    } catch (error) {
      console.error(error);
    }
  };

  const loadFromStorage = (): void => {
    if (!isBrowser()) {
      return;
    }

    if (!isInitialized) {
      isInitialized = true;

      try {
        const encryptedData = localStorage.getItem('trendly');
        if (!encryptedData) {
          return;
        }

        const decryptedData = decrypt(encryptedData);
        const authData = JSON.parse(decryptedData) as AuthData;

        accessToken = authData.accessToken || null;
        refreshToken = authData.refreshToken || null;
        expiresAt = authData.expiresAt ? dayjs(authData.expiresAt) : null;
        user = authData.user || null;
      } catch (error) {
        console.error(error);
        clearToken();
      }
    }
  };

  const setToken = (authData: AuthData): void => {
    accessToken = authData.accessToken;
    refreshToken = authData.refreshToken;
    expiresAt = authData.expiresAt ? dayjs().add(authData.expiresAt, 'second') : null;
    user = authData.user;
    saveToStorage();
  };

  const clearToken = (): void => {
    accessToken = null;
    refreshToken = null;
    expiresAt = null;
    user = null;
    if (isBrowser()) {
      localStorage.removeItem('trendly');
    }
  };

  const isTokenValid = (): boolean => {
    if (!accessToken) return false;

    if (expiresAt && dayjs().isAfter(expiresAt)) {
      // 만료된 토큰은 자동으로 제거하지 않고 refresh 시도 가능하도록 함
      return false;
    }

    return true;
  };

  const getAuthData = (): AuthData | null => {
    if (!isTokenValid()) {
      return null;
    }
    return {
      accessToken,
      refreshToken,
      expiresAt: expiresAt ? expiresAt.valueOf() : 0,
      user,
    };
  };

  const getAuthHeader = (): string | null => {
    const authData = getAuthData();
    if (!authData) {
      return null;
    }

    const { accessToken } = authData;
    return `${tokenType} ${accessToken}`;
  };

  return {
    setToken,
    clearToken,
    isTokenValid,
    getAuthData,
    getAuthHeader,
    loadFromStorage,
  };
})();

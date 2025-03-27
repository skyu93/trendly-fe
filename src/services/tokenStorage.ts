import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { isEmpty } from 'es-toolkit/compat';

dayjs.extend(utc);
dayjs.extend(timezone);

interface AuthData {
  accessToken: string | null;
  refreshToken: string | null;
  refreshExpiresAt: number | null;
}

export const TokenStorage = (() => {
  const LOCAL_STORAGE_KEY = 'trendly';
  const tokenType = 'Bearer';
  let accessToken: string | null = null;
  let refreshToken: string | null = null;
  let refreshExpiresAt: dayjs.Dayjs | null = null;
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
    if (!isBrowser() || !accessToken || !refreshExpiresAt) return;

    try {
      const authData = JSON.stringify({
        accessToken,
        refreshToken,
        refreshExpiresAt: refreshExpiresAt ? refreshExpiresAt.valueOf() : 0,
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, encrypt(authData));
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
        const encryptedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!encryptedData) {
          return;
        }

        const decryptedData = decrypt(encryptedData);
        const authData = JSON.parse(decryptedData) as AuthData;

        accessToken = authData.accessToken || null;
        refreshToken = authData.refreshToken || null;
        refreshExpiresAt = authData.refreshExpiresAt ? dayjs(authData.refreshExpiresAt).tz('Asia/Seoul') : null;
        if (!isTokenValid()) {
          clearToken();
        }
      } catch (error) {
        console.error(error);
        clearToken();
      }
    }
  };

  const setToken = (authData: AuthData): void => {
    accessToken = authData.accessToken;
    refreshToken = authData.refreshToken;
    refreshExpiresAt = authData.refreshExpiresAt ? dayjs(authData.refreshExpiresAt).tz('Asia/Seoul') : null;
    saveToStorage();
  };

  const clearToken = (): void => {
    accessToken = null;
    refreshToken = null;
    refreshExpiresAt = null;
    if (isBrowser()) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const isTokenValid = (): boolean => {
    if (!accessToken) {
      return false;
    }

    if (refreshExpiresAt && dayjs().isAfter(refreshExpiresAt)) {
      return false;
    }

    return true;
  };

  const getAuthData = (): AuthData => {
    return {
      accessToken,
      refreshToken,
      refreshExpiresAt: refreshExpiresAt ? refreshExpiresAt.valueOf() : 0,
    };
  };

  const getAuthHeader = (): string | null => {
    const { accessToken } = getAuthData();
    if (isEmpty(accessToken)) {
      return null;
    }
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

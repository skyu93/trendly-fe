import dayjs from 'dayjs';

export const TokenStorage = (() => {
  const tokenType = 'Bearer';
  let accessToken: string | null = null;
  let refreshToken: string | null = null;
  let expiresAt: dayjs.Dayjs | null = null;
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
        token: accessToken,
        refresh: refreshToken,
        expires: expiresAt ? expiresAt.valueOf() : 0,
      });

      localStorage.setItem('trendly', encrypt(authData));
    } catch (error) {
      console.error(error);
    }
  };

  const loadFromStorage = (): void => {
    if (!isBrowser()) return;

    if (!isInitialized) {
      isInitialized = true;

      try {
        const encryptedData = localStorage.getItem('trendly');

        if (!encryptedData) return;

        const decryptedData = decrypt(encryptedData);
        const authData = JSON.parse(decryptedData);

        accessToken = authData.token || null;
        refreshToken = authData.refresh || null;
        expiresAt = authData.expires ? dayjs(authData.expires) : null;
      } catch (error) {
        console.error(error);
        clearToken();
      }
    }
  };

  const setToken = (authData: { token: string; expiresIn: number; refreshToken: string }): void => {
    const { token, expiresIn, refreshToken: newRefreshToken } = authData;

    accessToken = token;
    refreshToken = newRefreshToken;
    expiresAt = dayjs().add(expiresIn, 'second');
    saveToStorage();
  };

  const clearToken = (): void => {
    accessToken = null;
    refreshToken = null;
    expiresAt = null;
    if (isBrowser()) {
      localStorage.removeItem('trendly');
    }
  };

  const isTokenValid = (): boolean => {
    loadFromStorage(); // 토큰 사용 전에 항상 최신 상태 확인

    if (!accessToken) return false;

    if (expiresAt && dayjs().isAfter(expiresAt)) {
      // 만료된 토큰은 자동으로 제거하지 않고 refresh 시도 가능하도록 함
      return false;
    }

    return true;
  };

  const getToken = (): string | null => {
    if (!isTokenValid()) {
      return null;
    }
    return accessToken;
  };

  const getRefreshToken = (): string | null => {
    loadFromStorage(); // 항상 최신 상태 확인
    return refreshToken;
  };

  const getAuthHeader = (): string | null => {
    const token = getToken();
    if (!token) {
      return null;
    }
    return `${tokenType} ${token}`;
  };

  // 브라우저에서만 초기 로드 수행
  if (isBrowser()) {
    loadFromStorage();
  }

  return {
    setToken,
    clearToken,
    isTokenValid,
    getToken,
    getRefreshToken,
    getAuthHeader,
  };
})();

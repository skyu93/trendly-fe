import { useCallback, useEffect, useMemo, useState } from 'react';

type BrowserType = 'safari' | 'chrome' | 'unknown';
type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const useBrowser = () => {
  const [browser, setBrowser] = useState<BrowserType>('unknown');
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  // 브라우저 타입 감지 함수
  const detectBrowser = useCallback((ua: string): BrowserType => {
    if (/safari/.test(ua) && !/chrome|crios/.test(ua)) {
      return 'safari';
    } else if (/chrome|crios/.test(ua) && !/edg/.test(ua)) {
      return 'chrome';
    }
    return 'unknown';
  }, []);

  // 디바이스 타입 감지 함수
  const detectDeviceType = useCallback((ua: string): DeviceType => {
    if (/android|webos|iphone|ipod|blackberry|iemobile|opera mini/.test(ua)) {
      return 'mobile';
    } else if (/ipad/.test(ua) || (/android/.test(ua) && !/mobile/.test(ua))) {
      return 'tablet';
    }
    return 'desktop';
  }, []);

  // 브라우저 정보 초기화 함수
  const initBrowserInfo = useCallback(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase();
      setBrowser(detectBrowser(ua));
      setDeviceType(detectDeviceType(ua));
    }
  }, [detectBrowser, detectDeviceType]);

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    initBrowserInfo();
  }, [initBrowserInfo]);

  const isSafari = useMemo(() => browser === 'safari', [browser]);
  const isChrome = useMemo(() => browser === 'chrome', [browser]);

  const isMobile = useMemo(() => deviceType === 'mobile', [deviceType]);
  const isTablet = useMemo(() => deviceType === 'tablet', [deviceType]);
  const isDesktop = useMemo(() => deviceType === 'desktop', [deviceType]);

  return {
    isSafari,
    isChrome,
    isMobile,
    isTablet,
    isDesktop,
  };
};

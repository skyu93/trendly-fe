import { useEffect, useState } from 'react';

export const useBrowser = () => {
  const [isSafari, setIsSafari] = useState(false);
  const [isChrome, setChrome] = useState(false);
  const [isMobileSafari, setIsMobileSafari] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const ua = navigator.userAgent;
      const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(ua);

      // iOS 모바일 사파리 감지
      const isIOS = /iPhone|iPad|iPod/.test(ua);
      const isStandardSafari = /Safari/.test(ua) && !/Chrome/.test(ua) && !/CriOS/.test(ua);
      const isMobileSafariBrowser = isIOS && isStandardSafari;

      setIsSafari(isSafariBrowser);
      setIsMobileSafari(isMobileSafariBrowser);
      setChrome(!isSafariBrowser);
    }
  }, []);

  return { isSafari, isChrome, isMobileSafari };
};

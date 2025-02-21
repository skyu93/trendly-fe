'use client';
import { useEffect } from 'react';
import { useSplash } from '@/hooks/useSplash';
import { Splash } from '@/components/Splash';

export default function SplashScreen() {
  const { isSplashVisible, hideSplash } = useSplash();

  useEffect(() => {
    const timer = setTimeout(() => {
      hideSplash(); // 3초 후 스플래시 숨기기
    }, 3000);

    return () => clearTimeout(timer); // 타이머 정리
  }, [isSplashVisible]);

  return isSplashVisible && <Splash />;
}

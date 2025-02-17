'use client';
import { Splash } from '@/components/Splash';
import OnBoarding from '@/app/client/OnBoarding';
import { useEffect, useState } from 'react';

export default function Home() {
  const [showOnBoarding, setShowOnBoarding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnBoarding(true);
    }, 3000);
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  if (!showOnBoarding) {
    return <Splash />; // 딜레이 동안 Splash 화면 표시
  }

  return <OnBoarding />;
}

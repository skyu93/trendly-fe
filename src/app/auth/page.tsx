'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { ROUTE_PATH } from '@/constants/route';
import { isNil } from 'es-toolkit/compat';
import { useSplash } from '@/hooks/useSplash';

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getToken } = useAuth();
  const { showSplash, isSplashVisible } = useSplash();

  useEffect(() => {
    if (!isSplashVisible) {
      router.push(ROUTE_PATH.LOGIN);
    }
  }, [isSplashVisible]);

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = searchParams.get('code');
      if (!code) {
        router.push(ROUTE_PATH.LOGIN);
        return;
      }

      const authToken = await getToken(code);
      if (isNil(authToken)) {
        router.push(ROUTE_PATH.LOGIN);
        return;
      }
      // 로그인 성공시
      console.log('Token :', authToken);
      showSplash();
    };

    handleKakaoCallback();
  }, [router, searchParams, getToken]);

  return <div>로그인중...</div>;
}

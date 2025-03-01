'use client';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { ROUTE_PATH } from '@/constants/route';
import { isNil } from 'es-toolkit/compat';
import { Splash } from '@/components/Splash';

export default function KakaoCallback() {
  return (
    <Suspense fallback={<Splash />}>
      <KakaoCallbackContent />
    </Suspense>
  );
}
const splashDelay = () => new Promise<void>(resolve => setTimeout(resolve, 3000));

function KakaoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getToken } = useAuth();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = searchParams.get('code');
      if (!code) {
        router.push(ROUTE_PATH.LOGIN);
        return;
      }

      const [authToken] = await Promise.all([getToken(code), splashDelay()]);

      if (isNil(authToken)) {
        router.push(ROUTE_PATH.LOGIN);
        return;
      }
      // 로그인 성공시
      console.log('Token :', authToken);
      router.push(ROUTE_PATH.KEYWORDS);
    };

    handleKakaoCallback();
  }, [router, searchParams, getToken]);

  return <Splash />;
}

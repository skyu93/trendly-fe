'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { ROUTE_PATH } from '@/constants/route';

export default function KakaoCallback() {
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

      try {
        const kakaoAuth = await getToken(code);
        // TODO: 사용자 정보를 서버에 저장하거나 상태 관리
        console.log('Token :', kakaoAuth);
      } catch (error) {
        console.error('Kakao login error:', error);
        router.push(ROUTE_PATH.LOGIN);
      }
    };

    handleKakaoCallback();
  }, [router, searchParams]);

  return <div>로그인 처리 중...</div>;
}

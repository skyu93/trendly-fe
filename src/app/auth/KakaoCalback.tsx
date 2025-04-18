'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/hooks/user/useUser';
import { ROUTE_PATH } from '@/constants/route';
import { Splash } from '@/components/Splash';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ApiError } from '@/services/apiError';
import { ERROR_CODES } from '@/constants/errorCodes';
import { useMarketingConsent } from '@/hooks/useMarketingConsent';

const splashDelay = () => new Promise<void>(resolve => setTimeout(resolve, 3000));

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useUser();
  const { handleError } = useErrorHandler();
  const { setOpen } = useMarketingConsent();
  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = searchParams.get('code');
      if (!code) {
        handleError(
          new ApiError({
            code: ERROR_CODES.LOGIN_FAILED,
          }),
        );
        return;
      }

      try {
        const [res] = await Promise.all([login(code), splashDelay()]);
        setOpen(!!res.isNewUser);
        router.push(ROUTE_PATH.KEYWORDS);
      } catch (error) {
        handleError(
          new ApiError({
            code: ERROR_CODES.LOGIN_FAILED,
            error,
          }),
        );
      }
    };
    handleKakaoCallback();
  }, [router, searchParams, login, handleError, setOpen]);

  return <Splash />;
}

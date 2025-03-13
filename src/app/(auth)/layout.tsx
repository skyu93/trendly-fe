'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { Splash } from '@/components/Splash';
import { ApiError } from '@/services/apiError';
import { ERROR_CODES } from '@/constants/errorCodes';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { isAuthenticated, renewAuth } = useAuth();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (!renewAuth()) {
      handleError(new ApiError({ code: ERROR_CODES.FORBIDDEN }));
    }
  }, [renewAuth, handleError]);

  useEffect(() => {
    if (!isAuthenticated()) {
      handleError(new ApiError({ code: ERROR_CODES.FORBIDDEN }));
      return;
    }
    setIsAuthorized(true);
  }, [isAuthenticated, handleError]);

  // 인증 체크 중이거나 인증되지 않은 경우
  if (!isAuthorized) {
    return <Splash />;
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
}

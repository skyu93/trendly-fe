import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/user/useUser';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';
import { ApiError } from '@/services/apiError';
import { ERROR_CODES } from '@/constants/errorCodes';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export const useAuth = (redirectOnFailure = false) => {
  const router = useRouter();
  const { isAuthenticated, isLogin, refreshAuthState } = useUser();
  const { handleError } = useErrorHandler();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // 로그인 흔적이 없는 경우
      if (!isLogin()) {
        if (redirectOnFailure) {
          router.push(ROUTE_PATH.LOGIN_INVITATION);
        }
        setIsAuthorized(false);
        return;
      }

      // 인증 데이터 갱신
      if (!(await refreshAuthState())) {
        // 사용자가 인증되어 있지 않은 경우
        if (!isAuthenticated()) {
          handleError(new ApiError({ code: ERROR_CODES.TOKEN_INVALID }));
          setIsAuthorized(false);
          return;
        }

        handleError(new ApiError({ code: ERROR_CODES.FORBIDDEN }));
        setIsAuthorized(false);
        return;
      }

      setIsAuthorized(true);
    };

    checkAuth();
  }, [refreshAuthState, isLogin, redirectOnFailure, router, setIsAuthorized, handleError, isAuthenticated]);

  return { isAuthorized };
};

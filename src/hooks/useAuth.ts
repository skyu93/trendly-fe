import { useEffect, useState, useCallback } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);

  // 로그인 상태가 없는 경우 처리
  const handleNotLoggedIn = useCallback(() => {
    if (redirectOnFailure) {
      router.push(ROUTE_PATH.LOGIN_INVITATION);
    }

    setIsAuthorized(false);
    setIsLoading(false);

    return false;
  }, [redirectOnFailure, router]);

  // 토큰 무효 에러 처리
  const handleTokenInvalid = useCallback(() => {
    handleError(new ApiError({ code: ERROR_CODES.TOKEN_INVALID }));
    setIsAuthorized(false);
    setIsLoading(false);
    return false;
  }, [handleError]);

  // 권한 없음 에러 처리
  const handleForbidden = useCallback(() => {
    handleError(new ApiError({ code: ERROR_CODES.FORBIDDEN }));
    setIsAuthorized(false);
    setIsLoading(false);
    return false;
  }, [handleError]);

  // 인증 상태 확인 메인 함수
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);

      // 로그인 흔적이 없는 경우
      if (!isLogin()) {
        return handleNotLoggedIn();
      }

      // 인증 데이터 갱신 시도
      const refreshSucceeded = await refreshAuthState();

      // 갱신 실패 시
      if (!refreshSucceeded) {
        // 사용자가 인증되어 있지 않은 경우 (토큰 무효)
        if (!isAuthenticated()) {
          return handleTokenInvalid();
        }

        // 권한 없음 에러
        return handleForbidden();
      }

      // 인증 성공
      setIsAuthorized(true);
      setIsLoading(false);
      return true;
    } catch (error) {
      // 예상치 못한 에러 처리
      setIsAuthorized(false);
      setIsLoading(false);
      handleError(error as Error);
      return false;
    }
  }, [isLogin, refreshAuthState, isAuthenticated, handleNotLoggedIn, handleTokenInvalid, handleForbidden, handleError]);

  // 인증 상태 확인 실행
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    isAuthorized,
    isLoading,
  };
};

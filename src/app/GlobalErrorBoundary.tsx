'use client';

import React, { ReactNode, useCallback, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ApiError } from '@/services/apiError';
import { ERROR_CODES } from '@/constants/errorCodes';
import { ROUTE_PATH } from '@/constants/route';
import { useRouter } from 'next/navigation';

export default function GlobalErrorBoundary({ children }: { children: ReactNode }) {
  const { isError, error, setError } = useErrorHandler();
  const router = useRouter();

  const handleErrorRouter = useCallback(() => {
    if (error instanceof ApiError) {
      const { code } = error;

      switch (code) {
        case ERROR_CODES.TOKEN_INVALID:
          // 토큰 만료 처리
          router.push(ROUTE_PATH.LOGIN_INVITATION);
          break;
        case ERROR_CODES.LOGIN_FAILED:
          // 로그인 실패 처리
          router.push(ROUTE_PATH.LOGIN);
          break;
        default:
          // 기타 오류 처리
          console.error(error);
          break;
      }
    } else if (error) {
      console.error(error);
    }
  }, [router, error]);

  useEffect(() => {
    handleErrorRouter();
  }, [error]);

  return (
    <>
      <AlertDialog open={isError}>
        <AlertDialogContent className="w-[80%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Oops!</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col items-center justify-center text-greyscale-30">
              <span className="text-xs">문제가 발생했어요...</span>
              <span className="text-xs">새로고침 하거나 다시 시도하면 괜찮아질 거예요!</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="h-12" onClick={() => setError(null)}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </>
  );
}

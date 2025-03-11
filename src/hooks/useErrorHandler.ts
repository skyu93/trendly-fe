import { useRouter } from 'next/navigation';
import { ApiError } from '@/services/apiError';
import { ERROR_CODES } from '@/constants/errorCodes';
import { ROUTE_PATH } from '@/constants/route';
import { useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { isNotNil } from 'es-toolkit';

type ErrorInstance = ApiError | AxiosError | Error | unknown;
export const useErrorHandler = () => {
  const router = useRouter();
  const [error, setError] = useState<ErrorInstance | null>(null);

  const isError = useMemo(() => isNotNil(error), [error]);
  const handleError = (error: ErrorInstance | null) => {
    if (error instanceof ApiError) {
      const { code } = error;
      switch (code) {
        case ERROR_CODES.TOKEN_INVALID:
          {
            // 토큰 만료
            router.push(ROUTE_PATH.LOGIN_INVITATION);
          }
          break;
        default:
          // 기타 오류 처리
          console.error('API 오류:', error);
          break;
      }
    }

    setError(error);
    return error;
  };

  return {
    handleError,
    isError,
    setError,
  };
};

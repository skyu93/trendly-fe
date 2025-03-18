import { ErrorCode, ErrorMessages } from '@/constants/errorCodes';

export class ApiError extends Error {
  code: ErrorCode;
  constructor({ code, message, error }: { code: ErrorCode; message?: string; error?: Error | unknown }) {
    const errorMessage = message || ErrorMessages[code] || '알 수 없는 오류가 발생했습니다.';
    super(errorMessage);

    this.code = code;
    if (error) {
      console.error(error);
    }
  }
}

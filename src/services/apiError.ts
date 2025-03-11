import { ErrorCode, ErrorMessages } from '@/constants/errorCodes';

export class ApiError extends Error {
  code: ErrorCode;
  constructor(code: ErrorCode, message?: string) {
    const errorMessage = message || ErrorMessages[code] || '알 수 없는 오류가 발생했습니다.';
    super(errorMessage);

    this.code = code;
  }
}

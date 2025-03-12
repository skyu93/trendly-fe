import { Union } from '@/helper/type';

export const ERROR_CODES = {
  TOKEN_INVALID: 'EAU001', // 유효하지 않은 토큰
  LOGIN_FAILED: 'EAU002', // 로그인 실패
  FORBIDDEN: 'EAU003', // 로그인 실패

  REQUIRED_FIELD: 'EVA001', // 필수 필드 누락
  INVALID_FORMAT: 'EVA002', // 잘못된 데이터 형식
} as const;

export type ErrorCode = Union<typeof ERROR_CODES>;
// 에러 메시지 맵
export const ErrorMessages: Record<string, string> = {
  // 인증 관련 에러 메시지
  [ERROR_CODES.TOKEN_INVALID]: '유효하지 않은 인증 토큰입니다.',
  [ERROR_CODES.LOGIN_FAILED]: '로그인에 실패했습니다.',
  [ERROR_CODES.FORBIDDEN]: '요청하신 페이지에 접근할 수 없습니다.',

  // 유효성 검사 에러 메시지
  [ERROR_CODES.REQUIRED_FIELD]: '필수 항목이 누락되었습니다.',
  [ERROR_CODES.INVALID_FORMAT]: '입력 형식이 올바르지 않습니다.',
};

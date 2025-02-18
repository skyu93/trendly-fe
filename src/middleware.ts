import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { includes } from 'es-toolkit/compat';

// 인증이 필요한 경로
const PROTECTED_ROUTES: string[] = ['/list'];

// 토큰 체크 함수
const isValidateToken = (token?: string): boolean => {
  if (!token) return false;

  try {
    // JWT 토큰 검증 로직
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 클라이언트 상태 체크 함수
// const checkClientState = async (req: NextRequest) => {
//   try {
//     // 쿠키로부터 상태 체크
//     const stateFromCookie = req.cookies.get('app_state')?.value;
//     if (stateFromCookie) {
//       const state = JSON.parse(stateFromCookie);
//       return {
//         isValid: true,
//         state
//       };
//     }
//   } catch (error) {
//     console.error('Client state check error:', error);
//     return {
//       isValid: false,
//       redirectUrl: '/error'
//     };
//   }
// };

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (includes(PROTECTED_ROUTES, pathname)) {
    // 2. 토큰 체크 - 쿠키와 로컬 스토리지 모두 확인
    const tokenFromCookie = req.cookies.get('auth_token')?.value;
    if (!isValidateToken(tokenFromCookie)) {
      const loginUrl = new URL('/about', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|404|not-found).*)'],
};

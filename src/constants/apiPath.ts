export const API_PATH = {
  LOGIN: '/auth/kakao/frontCallback',
  LOGOUT: '/auth/kakao/logout',

  USER_ME: '/auth/user/me',
  USER_UPDATE: '/auth/user/update',
  USER_DELETE: '/auth/user/delete',
} as const;

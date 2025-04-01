import { Union } from '@/helper/type';

export const API_PATH = {
  LOGIN: '/auth/kakao/frontCallback',
  LOGOUT: '/auth/kakao/logout',
  REFRESH_TOKEN: '/auth/refresh',

  USER_ME: '/auth/user/me',
  USER_UPDATE: '/auth/user/update',
  USER_DELETE: '/auth/user/delete',

  KEYWORDS_RANKING: '/keywords/ranking',

  CHAT_ENTER: '/app/rooms/{roomId}/enter',
  CHAT_PREVIOUS_MESSAGE: '/app/rooms/{roomId}/message.more',
  CHAT_UPDATE_NICKNAME: '/app/rooms/{roomId}/nickname.update',
  CHAT_LEAVE: '/app/rooms/{roomId}/left',
  CHAT_MY_LIST: '/app/rooms/my',
} as const;

export type ApiPath = Union<typeof API_PATH>;

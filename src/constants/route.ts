import { Union } from '@/helper/type';

export const ROUTE_PATH = {
  LOGIN: '/login',
  ABOUT: '/about',
  KEYWORDS: '/keywords',
  KEYWORDS_FILTER: '/keywords/filter',
  MY: '/my',
  WITHDRAW: '/withdraw',
  PROFILE: '/profile',
  CHAT: '/chat',
  CHATS: '/chats',
} as const;
export type RoutePath = Union<typeof ROUTE_PATH>;

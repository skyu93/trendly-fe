import { Union } from '@/helper/type';

export const ROUTE_PATH = {
  LOGIN: '/login',
  ABOUT: '/about',
  KEYWORDS: '/keywords',
  KEYWORDS_FILTER: '/keywords/filter',
  MY: '/my',
  WITHDRAW: '/my/withdraw',
  PROFILE: '/profile',
  CHATS: '/chats',
} as const;
export type RoutePath = Union<typeof ROUTE_PATH>;

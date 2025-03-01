import { Union } from '@/helper/type';

export const ROUTE_PATH = {
  LOGIN: '/login',
  ABOUT: '/about',
  KEYWORDS: '/keywords',
  MY: '/my',
  WITHDRAW: '/my/withdraw',
  PROFILE: '/profile',
} as const;
export type RoutePath = Union<typeof ROUTE_PATH>;

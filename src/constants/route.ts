import { Union } from '@/helper/type';

export const ROUTE_PATH = {
  LOGIN: '/login',
  ABOUT: '/about',
  KEYWORDS: '/keywords',
} as const;
export type RoutePath = Union<typeof ROUTE_PATH>;

export const ROUTE_PAGE_META: Partial<Record<RoutePath, { title: string; icon: string }>> = {
  [ROUTE_PATH.KEYWORDS]: { title: '키워드 순위', icon: 'logo' },
};

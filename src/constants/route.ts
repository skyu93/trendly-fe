import { Union } from '@/helper/type';

export const ROUTE_PATH = {
  LOGIN: '/login',
  ABOUT: '/about',
  KEYWORDS: '/keywords',
  MY: '/my',
  PROFILE: '/my/profile',
} as const;
export type RoutePath = Union<typeof ROUTE_PATH>;

export const ROUTE_PAGE_META: Partial<Record<RoutePath, { title: string; icon: string; canGoBack: boolean }>> = {
  [ROUTE_PATH.KEYWORDS]: { title: '키워드 순위', icon: 'logo', canGoBack: false },
  [ROUTE_PATH.MY]: { title: '마이', icon: 'logo', canGoBack: false },
  [ROUTE_PATH.PROFILE]: { title: '회원정보 수정', icon: 'arrow-left', canGoBack: true },
};

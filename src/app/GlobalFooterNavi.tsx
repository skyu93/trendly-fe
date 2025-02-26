'use client';

import { usePageMeta } from '@/hooks/page-meta/usePageMeta';
import SvgIcon from '@/components/SvgIcon';
import { Suspense, useCallback } from 'react';
import { ROUTE_PATH, RoutePath } from '@/constants/route';

export function GlobalFooterNavi() {
  return (
    <Suspense fallback={<div></div>}>
      <Navigation />
    </Suspense>
  );
}
function Navigation() {
  const { pageMeta } = usePageMeta();

  const isCurrentPage = useCallback(
    (path: RoutePath) => {
      return path === pageMeta?.pathname;
    },
    [pageMeta],
  );

  return (
    pageMeta && (
      <footer className="absolute bottom-0 left-0 right-0 z-10 h-[60px] bg-greyscale-80 flex items-center justify-between">
        <div className="w-40 h-full flex flex-col items-center justify-center gap-1">
          <SvgIcon id="logo" color={isCurrentPage(ROUTE_PATH.KEYWORDS) ? 'primary' : 'greyscale-40'} />
          <span
            className={`text-[10px] ${isCurrentPage(ROUTE_PATH.KEYWORDS) ? 'text-greyscale-10' : 'text-greyscale-40'}`}
          >
            홈
          </span>
        </div>
        <div className="w-40 h-full flex flex-col items-center justify-center gap-1">
          <SvgIcon id="annotation-dots" color="greyscale-40" />
          <span className="text-greyscale-40 text-[10px]">리스트</span>
        </div>
        <div className="w-40 h-full flex flex-col items-center justify-center gap-1">
          <SvgIcon id="user" color="greyscale-40" />
          <span className="text-greyscale-40 text-[10px]">마이</span>
        </div>
      </footer>
    )
  );
}

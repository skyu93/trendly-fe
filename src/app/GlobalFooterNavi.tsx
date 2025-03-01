'use client';

import SvgIcon from '@/components/SvgIcon';
import { Suspense, useCallback } from 'react';
import { ROUTE_PATH, RoutePath } from '@/constants/route';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function GlobalFooterNavi() {
  return (
    <Suspense fallback={<div />}>
      <Navigation />
    </Suspense>
  );
}
function Navigation() {
  const pathname = usePathname();

  const isCurrentPage = useCallback((path: RoutePath) => path === pathname, [pathname]);

  return (
    <footer className="absolute bottom-0 left-0 right-0 z-10 h-[60px] bg-greyscale-80 flex items-center justify-between">
      <Link href={ROUTE_PATH.KEYWORDS} className="w-40 h-full flex flex-col items-center justify-center gap-1">
        <SvgIcon id="logo" color={isCurrentPage(ROUTE_PATH.KEYWORDS) ? 'primary' : 'greyscale-40'} />
        <span
          className={`text-[10px] ${isCurrentPage(ROUTE_PATH.KEYWORDS) ? 'text-greyscale-10' : 'text-greyscale-40'}`}
        >
          홈
        </span>
      </Link>
      <div className="w-40 h-full flex flex-col items-center justify-center gap-1">
        <SvgIcon id="annotation-dots" color="greyscale-40" />
        <span className="text-greyscale-40 text-[10px]">채팅</span>
      </div>
      <Link href={ROUTE_PATH.MY} className="w-40 h-full flex flex-col items-center justify-center gap-1">
        <SvgIcon id="user" color={isCurrentPage(ROUTE_PATH.MY) ? 'primary' : 'greyscale-40'} />
        <span className={`text-[10px] ${isCurrentPage(ROUTE_PATH.MY) ? 'text-greyscale-10' : 'text-greyscale-40'}`}>
          마이
        </span>
      </Link>
    </footer>
  );
}

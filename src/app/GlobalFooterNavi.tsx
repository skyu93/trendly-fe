'use client';

import SvgIcon from '@/components/icon/SvgIcon';
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
    <nav
      id="nav"
      className="fixed bottom-0 h-[var(--footer-height)] w-full max-w-[420px] bg-greyscale-80 flex items-center justify-between z-[10000]"
    >
      <Link href={ROUTE_PATH.KEYWORDS} className="flex-1 h-full flex flex-col items-center justify-center gap-1">
        <SvgIcon id="logo" color={isCurrentPage(ROUTE_PATH.KEYWORDS) ? 'primary' : 'greyscale-40'} />
        <span
          className={`text-[10px] ${isCurrentPage(ROUTE_PATH.KEYWORDS) ? 'text-greyscale-10' : 'text-greyscale-40'}`}
        >
          홈
        </span>
      </Link>
      <Link href={ROUTE_PATH.CHATS} className="flex-1 h-full flex flex-col items-center justify-center gap-1">
        <SvgIcon id="annotation-dots" color={isCurrentPage(ROUTE_PATH.CHATS) ? 'primary' : 'greyscale-40'} />
        <span className={`text-[10px] ${isCurrentPage(ROUTE_PATH.CHATS) ? 'text-greyscale-10' : 'text-greyscale-40'}`}>
          채팅
        </span>
      </Link>
      <Link href={ROUTE_PATH.MY} className="flex-1 h-full flex flex-col items-center justify-center gap-1">
        <SvgIcon id="user" color={isCurrentPage(ROUTE_PATH.MY) ? 'primary' : 'greyscale-40'} />
        <span className={`text-[10px] ${isCurrentPage(ROUTE_PATH.MY) ? 'text-greyscale-10' : 'text-greyscale-40'}`}>
          마이
        </span>
      </Link>
    </nav>
  );
}

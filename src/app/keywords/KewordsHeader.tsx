'use client';
import GlobalHeader from '@/app/GlobalHeader';
import SvgIcon from '@/components/icon/SvgIcon';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { ROUTE_PATH } from '@/constants/route';

export default function KeywordsHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const isFilterPage = useMemo(() => pathname === ROUTE_PATH.KEYWORDS_FILTER, [pathname]);

  return (
    <GlobalHeader>
      {isFilterPage ? (
        <>
          <GlobalHeader.Icon>
            <span onClick={() => router.push(ROUTE_PATH.KEYWORDS)}>
              <SvgIcon id="arrow-left" className="text-greyscale-10 hover:text-greyscale-40 cursor-pointer" />
            </span>
          </GlobalHeader.Icon>
          <GlobalHeader.Title>기간 설정</GlobalHeader.Title>
        </>
      ) : (
        <>
          <GlobalHeader.Icon>
            <SvgIcon id="logo" className="text-primary" />
          </GlobalHeader.Icon>
          <GlobalHeader.Title>키워드 순위</GlobalHeader.Title>
        </>
      )}
    </GlobalHeader>
  );
}

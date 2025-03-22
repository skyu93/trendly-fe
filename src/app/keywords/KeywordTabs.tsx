'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { map } from 'es-toolkit/compat';
import KeywordRankList from '@/app/keywords/KeywordRankList';
import { useEffect, useMemo, useState } from 'react';
import { useKeywordRankFilter } from '@/hooks/useKeywordRankFilter';
import { useUser } from '@/hooks/user/useUser';
import MarketingConsentDrawer from '@/app/keywords/MarketingConsentDrawer';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

const TAB_LIST = [
  { label: '검색엔진', value: 'searchEngine' },
  { label: '구글', value: 'google' },
  { label: '네이버', value: 'naver' },
] as const;

type TabValue = (typeof TAB_LIST)[number]['value'];

export default function KeywordTabs() {
  const [currentTab, setCurrentTab] = useState<TabValue>('searchEngine');
  const { getContentsTitle, getKeywords, keywordRankingData, filterPeriod, isLoading } = useKeywordRankFilter();
  const { refreshAuthState } = useUser();

  useEffect(() => {
    refreshAuthState();
  }, [refreshAuthState]);

  useEffect(() => {
    getKeywords();
  }, [filterPeriod, getKeywords]);

  // 현재 탭에 맞는 키워드 데이터 필터링
  const filteredKeywordRanking = useMemo(() => {
    if (!keywordRankingData?.keywordsPlatformRanking) {
      return [];
    }
    return keywordRankingData.keywordsPlatformRanking;
  }, [keywordRankingData?.keywordsPlatformRanking]);

  // 로딩 중일 때 보여줄 Skeleton 컴포넌트
  const KeywordSkeletonLoader = () => (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between py-8"></div>
      <ScrollArea className="flex-1 pr-3">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <>
              <div key={index} className="flex items-center space-x-4 p-3 h-[67px] border-greyscale-10">
                <Skeleton className="h-7 w-11 rounded-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-24" />
              </div>
            </>
          ))}
      </ScrollArea>
    </div>
  );

  return (
    <>
      <Tabs defaultValue={currentTab} className="px-4 page-container" onValueChange={v => setCurrentTab(v as TabValue)}>
        <TabsList className={`grid grid-cols-3`}>
          {map(TAB_LIST, ({ label, value }) => {
            return (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {map(TAB_LIST, ({ value }) => {
          return (
            <TabsContent key={value} value={value} className="w-full h-[calc(100%-36px)]">
              {isLoading ? (
                <KeywordSkeletonLoader />
              ) : filteredKeywordRanking.length > 0 ? (
                <KeywordRankList title={getContentsTitle()} ranking={filteredKeywordRanking} />
              ) : (
                <div className="absolute inset-0 m-auto w-fit h-fit">
                  <div className="flex flex-col items-center justify-center text-greyscale-40">
                    <span className="text-xs">키워드 순위가 존재하지 않습니다.</span>
                  </div>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
      <MarketingConsentDrawer />
    </>
  );
}

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { map } from 'es-toolkit/compat';
import KeywordRankList from '@/app/keywords/KeywordRankList';
import { useEffect, useMemo, useState } from 'react';
import { useKeywordRankFilter } from '@/hooks/useKeywordRankFilter';
import { useUser } from '@/hooks/user/useUser';
import MarketingConsentDrawer from '@/app/keywords/MarketingConsentDrawer';

const TAB_LIST = [
  { label: '검색엔진', value: 'searchEngine' },
  { label: '구글', value: 'google' },
  { label: '네이버', value: 'naver' },
] as const;

type TabValue = (typeof TAB_LIST)[number]['value'];

export default function KeywordTabs() {
  const [currentTab, setCurrentTab] = useState<TabValue>('searchEngine');
  const { getContentsTitle, getKeywords, keywordRankingData, filterPeriod } = useKeywordRankFilter();
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
              {filteredKeywordRanking.length > 0 ? (
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

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { map } from 'es-toolkit/compat';
import KeywordRankList from '@/app/keywords/KeywordRankList';
import { useEffect, useMemo, useState } from 'react';
import { useKeywordRankFilter } from '@/hooks/useKeywordRankFilter';
import { useUser } from '@/hooks/user/useUser';
import MarketingConsentDrawer from '@/app/keywords/MarketingConsentDrawer';
import SvgIcon from '@/components/icon/SvgIcon';
import { ROUTE_PATH } from '@/constants/route';
import { useRouter } from 'next/navigation';
import KeywordSkeleton from './KeywordSkeleton';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';

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
  const { isAuthorized } = useAuth();
  const router = useRouter();
  const { getMyChatList } = useChat();

  useEffect(() => {
    refreshAuthState();
  }, [refreshAuthState]);

  useEffect(() => {
    getKeywords();
  }, [filterPeriod, getKeywords]);

  useEffect(() => {
    if (isAuthorized) {
      getMyChatList();
    }
  }, [getMyChatList, isAuthorized]);

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
              <div className="flex flex-col w-full h-full">
                <div className="flex items-center justify-between py-8">
                  <div className="flex items-center gap-1">
                    <SvgIcon id="trend" color="primary" />
                    <span className="text-greyscale-10 text-lg font-bold">{getContentsTitle()}</span>
                  </div>
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:text-greyscale-40"
                    onClick={() => router.push(ROUTE_PATH.KEYWORDS_FILTER)}
                  >
                    <div className="text-greyscale-20 text-sm">기간설정</div>
                    <SvgIcon id="filter" size={12} color="greyscale-20" />
                  </div>
                </div>
                {isLoading ? (
                  <KeywordSkeleton />
                ) : filteredKeywordRanking.length > 0 ? (
                  <KeywordRankList ranking={filteredKeywordRanking} />
                ) : (
                  <div className="absolute inset-0 m-auto w-fit h-fit">
                    <div className="flex flex-col items-center justify-center text-greyscale-40">
                      <span className="text-xs">키워드 순위가 존재하지 않습니다.</span>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
      <MarketingConsentDrawer />
    </>
  );
}

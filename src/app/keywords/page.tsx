'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import KeywordRankList from '@/app/keywords/KeywordRankList';
import { useMemo, useState } from 'react';
import { map } from 'es-toolkit/compat';
import { useKeywordRankFilter } from '@/hooks/useKeywordRankFilter';

const TAB_LIST = [
  { label: '검색엔진', value: 'searchEngine' },
  { label: '트위터', value: 'twitter' },
  { label: '인스타', value: 'instar' },
  { label: '스레드', value: 'threads' },
] as const;

type TabValue = (typeof TAB_LIST)[number]['value'];

export default function Main() {
  const [currentTab, setCurrentTab] = useState<TabValue>('searchEngine');
  const { filterPeriod, monthly, weekly, daily } = useKeywordRankFilter();
  const ranks = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({ rank: i + 1, keyword: `${currentTab} ${i}` }));
  }, [currentTab]);

  const contentsTitle = useMemo(() => {
    switch (filterPeriod) {
      case 'realtime':
        return '실시간';
      case 'monthly': {
        const { year, month } = monthly;
        return `${year}년 ${month}월`;
      }
      case 'weekly': {
        const { year, month, week } = weekly;
        return `${year}년 ${month}월 ${week}주차`;
      }
      case 'daily': {
        const { year, month, day } = daily;
        return `${year}년 ${month}월 ${day}일`;
      }
      default:
        return '실시간';
    }
  }, [filterPeriod, monthly, weekly, daily]);

  return (
    <Tabs defaultValue={currentTab} className="page-container px-4" onValueChange={v => setCurrentTab(v as TabValue)}>
      <TabsList className="grid grid-cols-4">
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
            <KeywordRankList title={contentsTitle} list={ranks} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

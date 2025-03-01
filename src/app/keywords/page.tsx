'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import KeywordRankList from '@/app/keywords/KeywordRankList';
import { useMemo, useState } from 'react';
import { map } from 'es-toolkit/compat';

const TAB_LIST = [
  { label: '검색엔진', value: 'searchEngine' },
  { label: '트위터', value: 'twitter' },
  { label: '인스타', value: 'instar' },
  { label: '스레드', value: 'threads' },
] as const;

type TabValue = (typeof TAB_LIST)[number]['value'];

export default function Main() {
  const [currentTab, setCurrentTab] = useState<TabValue>('searchEngine');

  const ranks = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({ rank: i + 1, keyword: `${currentTab} ${i}` }));
  }, [currentTab]);

  return (
    <Tabs defaultValue={currentTab} className="w-full h-full px-4" onValueChange={v => setCurrentTab(v as TabValue)}>
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
            <KeywordRankList title="실시간" list={ranks} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

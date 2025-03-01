'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMemo, useState } from 'react';
import { map } from 'es-toolkit/compat';
import ChatRoomList from '@/app/chats/ChatRoomList';

const TAB_LIST = [
  { label: '인기 채팅방', value: 'popularity' },
  { label: '나의 채팅방', value: 'my' },
] as const;

type TabValue = (typeof TAB_LIST)[number]['value'];

export default function ChatsPage() {
  const [currentTab, setCurrentTab] = useState<TabValue>('popularity');

  const ranks = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      title: `키워드 ${i}`,
      chatRoomUrl: `${currentTab}/${i}`,
      userCount: currentTab === 'popularity' ? i + 10 : undefined,
    }));
  }, [currentTab]);

  return (
    <Tabs defaultValue={currentTab} className="w-full h-full px-4" onValueChange={v => setCurrentTab(v as TabValue)}>
      <TabsList className="grid grid-cols-2">
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
            <ChatRoomList list={ranks} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

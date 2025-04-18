'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useMemo, useState } from 'react';
import { map } from 'es-toolkit/compat';
import ChatRoomList from '@/app/(auth)/chats/ChatRoomList';
import { useChat } from '@/hooks/useChat';
import ChatRoomSkeleton from '@/app/(auth)/chats/ChatRoomSkeleton';

const TAB_LIST = [
  { label: '인기 채팅방', value: 'popularity' },
  { label: '나의 채팅방', value: 'my' },
] as const;

type TabValue = (typeof TAB_LIST)[number]['value'];

export default function ChatsPage() {
  const [currentTab, setCurrentTab] = useState<TabValue>('popularity');
  const { getMyChatList, myChatRooms, isLoading } = useChat();

  useEffect(() => {
    if (currentTab === 'my') {
      getMyChatList();
    }
  }, [currentTab, getMyChatList]);

  const chatRooms = useMemo(() => {
    return currentTab === 'my' ? myChatRooms : [];
  }, [currentTab, myChatRooms]);

  return (
    <Tabs defaultValue={currentTab} className="page-container px-4" onValueChange={v => setCurrentTab(v as TabValue)}>
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
            {isLoading ? (
              <ChatRoomSkeleton />
            ) : chatRooms.length > 0 ? (
              <ChatRoomList list={chatRooms} />
            ) : (
              <div className="absolute inset-0 m-auto w-fit h-fit">
                <div className="flex flex-col items-center justify-center text-greyscale-40">
                  <span className="text-xs mb-3">참여한 채팅방이 없어요.</span>
                  <span className="text-xs">키워드 순위와 인기 채팅방 확인을 통해</span>
                  <span className="text-xs">채팅방에 참여해 보세요!</span>
                </div>
              </div>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

'use client';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatRoomCard from '@/app/(auth)/chats/ChatRoomCard';
import { map } from 'es-toolkit/compat';

interface Props {
  list: {
    keyword: string;
    roomId: number;
    participantCount?: number;
  }[];
}
export default function ChatRoomList({ list }: Props) {
  return (
    <div className="flex flex-col w-full h-full text-greyscale-10">
      <ScrollArea className="flex-1">
        {map(list, ({ keyword, roomId, participantCount }) => (
          <div key={keyword}>
            <ChatRoomCard title={keyword} roomId={roomId} userCount={participantCount} />
            <Separator className="bg-greyscale-80" />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

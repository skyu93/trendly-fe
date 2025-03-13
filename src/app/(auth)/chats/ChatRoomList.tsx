import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatRoomCard from '@/app/(auth)/chats/ChatRoomCard';

interface Props {
  list: {
    title: string;
    chatRoomUrl: string;
    userCount?: number;
  }[];
}
export default function ChatRoomList({ list }: Props) {
  return (
    <div className="flex flex-col w-full h-full text-greyscale-10">
      <ScrollArea className="flex-1">
        {list.map(({ title, userCount }) => (
          <div key={title}>
            <ChatRoomCard title={title} userCount={userCount} />
            <Separator className="bg-greyscale-80" />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

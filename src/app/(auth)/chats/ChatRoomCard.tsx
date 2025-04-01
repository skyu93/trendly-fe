'use client';

import { Button } from '@/components/ui/button/Button';
import { isNotNil } from 'es-toolkit';
import { useChat } from '@/hooks/useChat';
import { ROUTE_PATH } from '@/constants/route';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useErrorHandler } from '@/hooks/useErrorHandler';

interface Props {
  title: string;
  roomId: number;
  userCount?: number;
}

export default function ChatRoomCard({ title, roomId, userCount }: Props) {
  const { joinRoom } = useChat();
  const { isAuthorized } = useAuth();
  const router = useRouter();
  const { handleError } = useErrorHandler();

  const handleEnterChatRoom = async () => {
    try {
      if (!isAuthorized) {
        return router.push(ROUTE_PATH.LOGIN_INVITATION);
      }
      const success = await joinRoom({
        roomId,
        roomName: title,
      });
      if (success) {
        router.push(ROUTE_PATH.CHAT);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="group flex items-center justify-between px-3 h-[67px] rounded-lg">
      <div className="flex flex-col items-start">
        <span>{title}</span>
        {isNotNil(userCount) && <span className="text-xs text-primary-40">{userCount}명 참여중</span>}
      </div>
      <Button
        variant="outline"
        className="py-[2px] px-3 border-greyscale-80 bg-greyscale-90 text-greyscale-20 rounded-[6px]"
        onClick={handleEnterChatRoom}
      >
        <span>채팅하기</span>
      </Button>
    </div>
  );
}

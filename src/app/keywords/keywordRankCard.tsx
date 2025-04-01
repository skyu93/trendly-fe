'use client';

import SvgIcon from '@/components/icon/SvgIcon';
import { Button } from '@/components/ui/button/Button';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';
import PreChatSetupDialog from '@/app/keywords/PreChatSetupDialog';
import { useUser } from '@/hooks/user/useUser';
import { useChat } from '@/hooks/useChat';
import { isNil } from 'es-toolkit/compat';
import { useErrorHandler } from '@/hooks/useErrorHandler';

interface Props {
  rank: number;
  keyword: string;
  roomId?: number;
}

export default function KeywordRankCard({ rank, keyword, roomId }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const { isJoinedChatRoom, joinRoom } = useChat();
  const { handleError } = useErrorHandler();

  const handleEnterChatRoom = async () => {
    if (isNil(roomId)) {
      return;
    }

    if (!isAuthenticated()) {
      router.push(ROUTE_PATH.LOGIN_INVITATION);
      return;
    }

    try {
      if (isJoinedChatRoom(roomId)) {
        const success = await joinRoom({
          roomId,
          roomName: keyword,
        });
        if (success) {
          router.push(ROUTE_PATH.CHAT);
        }
      } else {
        setShowDialog(true);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const goToChatRoom = useCallback(
    (actionState: boolean) => {
      if (actionState) {
        router.push(ROUTE_PATH.CHAT);
        return;
      }
      setShowDialog(false);
    },
    [setShowDialog, router, isAuthenticated],
  );
  return (
    <>
      <div className="flex items-center justify-between px-3 h-[67px]">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-greyscale-80 text-greyscale-10 font-bold flex items-center justify-center">
            {rank}
          </div>
          <span className="ml-[6px]">{keyword}</span>
        </div>
        {roomId && (
          <Button
            onClick={handleEnterChatRoom}
            variant="outline"
            className="py-2 px-3 border-greyscale-80 bg-greyscale-90 text-primary-60"
          >
            <span>채팅하기</span>
            <SvgIcon id="add-chat" />
          </Button>
        )}
      </div>
      {roomId && <PreChatSetupDialog roomId={roomId} roomName={keyword} open={showDialog} onClose={goToChatRoom} />}
    </>
  );
}

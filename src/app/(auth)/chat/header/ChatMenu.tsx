'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronRight, Menu } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { useChat } from '@/hooks/useChat';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import ExitChatDialog from '@/app/(auth)/chat/header/ExitChatDialog';
import { useToast } from '@/hooks/use-toast';

interface ChatMenuProps {
  openChangeNickName: (flag: boolean) => void;
}

const ChatMenu: React.FC<ChatMenuProps> = ({ openChangeNickName }) => {
  const { leaveRoom, error } = useChat();
  const router = useRouter();
  const { handleError } = useErrorHandler();
  const { toast } = useToast();

  const [isExitDialogOpen, setIsExitDialogOpen] = useState<boolean>(false);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleLeaveRoom = useCallback(
    async (isLeave: boolean) => {
      if (isLeave) {
        await leaveRoom();
        router.push(ROUTE_PATH.KEYWORDS);
        toast({ description: '채팅방이 종료되었어요.' });
      }
      setIsExitDialogOpen(false);
      setIsSheetOpen(false);
    },
    [leaveRoom, router, toast],
  );

  const handleNicknameChange = () => {
    openChangeNickName(true);
    setIsSheetOpen(false);
  };

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error, handleError]);

  return (
    <>
      <ExitChatDialog isOpen={isExitDialogOpen} onClose={handleLeaveRoom} />
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <button onClick={() => setIsSheetOpen(true)}>
            <Menu className="w-5 h-5 text-greyscale-40" />
          </button>
        </SheetTrigger>
        <SheetContent containerSelector="#main" className="bg-dark-02">
          <SheetHeader>
            <SheetTitle className="text-primary-60 text-sm h-10 mt-3">설정</SheetTitle>
            <SheetDescription className="h-10 flex justify-between hover:cursor-pointer" onClick={handleNicknameChange}>
              <span className="text-greyscale-10 text-sm">닉네임 수정</span>
              <ChevronRight size={20} className="text-greyscale-20" />
            </SheetDescription>

            <SheetFooter>
              <div>
                <Separator className="bg-greyscale-80 h-10" />
              </div>
              <div
                className="mb-8 text-greyscale-50 hover:text-greyscale-20 hover:cursor-pointer"
                onClick={() => setIsExitDialogOpen(true)}
              >
                채팅방 나가기
              </div>
            </SheetFooter>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChatMenu;

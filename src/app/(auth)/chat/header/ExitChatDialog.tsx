import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import React from 'react';
import { Button } from '@/components/ui/button/Button';

interface Props {
  isOpen: boolean;
  onClose: (confirmed: boolean) => void;
}

export default function ExitChatDialog({ isOpen, onClose }: Props) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-[80%]">
        <AlertDialogHeader>
          <AlertDialogTitle>채팅방 나가기</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center justify-center text-greyscale-30">
            <span className="text-xs">채팅방을 나가면 참여중인 채팅방에서</span>
            <span className="text-xs">해당 채팅방을 확인 할 수 없습니다.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="tertiary" className="h-12" onClick={() => onClose(true)}>
            나가기
          </Button>
          <Button variant="outline" className="h-12" onClick={() => onClose(false)}>
            취소
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

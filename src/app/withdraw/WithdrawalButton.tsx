'use client';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';

interface Props {
  isAgreed: boolean;
}
export function WithdrawalButton({ isAgreed }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    setIsLoading(true);
    try {
      router.replace(ROUTE_PATH.LOGIN);
    } catch (error) {
      console.error('탈퇴 처리 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog containerSelector="#main">
      <AlertDialogTrigger
        disabled={!isAgreed || isLoading}
        className="text-[#E97979] h-10 rounded-md border border-greyscale-70 hover:bg-greyscale-80 disabled:cursor-not-allowed disabled:bg-greyscale-20 disabled:text-greyscale-40"
      >
        탈퇴하기
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[80%]">
        <AlertDialogHeader>
          <AlertDialogTitle>탈퇴하기</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <div className="flex flex-col">
              <span>탈퇴 시 참여하셨던 채팅방 내용은 즉시 삭제됩니다.</span>
              <span>정말 탈퇴하시겠습니까?</span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="h-12" onClick={handleConfirm}>
            탈퇴하기
          </AlertDialogAction>
          <AlertDialogCancel className="h-12">취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

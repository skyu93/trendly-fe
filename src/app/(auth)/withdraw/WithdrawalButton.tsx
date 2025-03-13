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
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';
import { Button } from '@/components/ui/button/Button';

interface Props {
  isAgreed: boolean;
  className?: string;
}
export function WithdrawalButton({ isAgreed, className }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    setIsLoading(true);
    setShowDialog(false);
    try {
      // TODO: 유저 세션 정보 모두 삭제
      router.replace(ROUTE_PATH.LOGIN);
    } catch (error) {
      console.error('탈퇴 처리 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className={className}
        disabled={!isAgreed || isLoading}
        onClick={() => setShowDialog(true)}
      >
        탈퇴하기
      </Button>
      <AlertDialog open={showDialog}>
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
            <AlertDialogCancel className="h-12" onClick={() => setShowDialog(false)}>
              취소
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

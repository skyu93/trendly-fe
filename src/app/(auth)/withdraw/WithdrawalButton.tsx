'use client';
import { useCallback, useState } from 'react';
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
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useUser } from '@/hooks/user/useUser';

interface Props {
  isAgreed: boolean;
  className?: string;
}
export function WithdrawalButton({ isAgreed, className }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { deleteAccount } = useUser();
  const { handleError } = useErrorHandler();

  const handleConfirm = useCallback(async () => {
    setIsLoading(true);
    setShowDialog(false);
    try {
      await deleteAccount();
      router.replace(ROUTE_PATH.LOGIN);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, [router, deleteAccount, handleError]);
  const handleCancel = useCallback(() => {
    setShowDialog(false);
    router.replace(ROUTE_PATH.MY);
  }, [router]);

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
            <AlertDialogTitle>탈퇴를 진행 하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              <div className="flex flex-col">
                <span>탈퇴 시, 채팅•좋아요•이모지 등</span>
                <span>개인 활동 내역을 복구할 수 없으며,</span>
                <span>7일 간 재가입이 불가합니다.</span>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="h-12" onClick={handleConfirm}>
              탈퇴하기
            </AlertDialogAction>
            <AlertDialogCancel className="h-12" onClick={handleCancel}>
              취소
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

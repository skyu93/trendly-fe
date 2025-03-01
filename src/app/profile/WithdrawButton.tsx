'use client';
import { Button } from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';

export function WithdrawButton({ isEditing }: { isEditing: boolean }) {
  const router = useRouter();

  const handleWithdrawal = async () => {
    router.push(ROUTE_PATH.WITHDRAW);
  };

  return (
    <Button
      variant="outline"
      className="w-full h-10 text-[#E97979] disabled:bg-transparent disabled:text-greyscale-60"
      onClick={handleWithdrawal}
      disabled={isEditing}
    >
      탈퇴하기
    </Button>
  );
}

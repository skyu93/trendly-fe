'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button/Button';

export function WithdrawButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdrawal = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
      setIsLoading(true);
      try {
        // await withdrawMembership();
        console.log('회원 탈퇴 처리');
        // 탈퇴 성공 시 리다이렉트 등의 처리
      } catch (error) {
        console.error('탈퇴 처리 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full h-10 border-gray-700 text-[#E97979] hover:text-red-300 hover:bg-gray-900"
      onClick={handleWithdrawal}
      disabled={isLoading}
    >
      {isLoading ? '처리중...' : '회원 탈퇴'}
    </Button>
  );
}

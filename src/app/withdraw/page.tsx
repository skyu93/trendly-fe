'use client';
import { WithdrawalButton } from '@/app/withdraw/WithdrawalButton';
import { useState } from 'react';
import WithdrawalNotice from '@/app/withdraw/WithdrawalNotice';
import { Button } from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [isAgreed, setIsAgreed] = useState(false);
  const router = useRouter();
  return (
    <div className="page-container flex flex-col justify-between px-4 text-greyscale-10">
      <WithdrawalNotice isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
      <div className="flex items-center w-full gap-x-3">
        <Button className="flex-1" variant="outline" onClick={() => router.back()}>
          취소하기
        </Button>
        <WithdrawalButton className="flex-1 text-[#E97979]" isAgreed={isAgreed} />
      </div>
    </div>
  );
}

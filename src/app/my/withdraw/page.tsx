'use client';
import { WithdrawalButton } from '@/app/my/withdraw/WithdrawalButton';
import { useState } from 'react';
import WithdrawalNotice from '@/app/my/withdraw/WithdrawalNotice';

export default function Page() {
  const [isAgreed, setIsAgreed] = useState(false);
  return (
    <div className="relative w-full h-full flex flex-col justify-between mt-3 px-4 text-greyscale-10">
      <WithdrawalNotice isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
      <WithdrawalButton isAgreed={isAgreed} />
    </div>
  );
}

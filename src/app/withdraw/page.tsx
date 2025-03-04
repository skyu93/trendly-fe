'use client';
import { WithdrawalButton } from '@/app/withdraw/WithdrawalButton';
import { useState } from 'react';
import WithdrawalNotice from '@/app/withdraw/WithdrawalNotice';

export default function Page() {
  const [isAgreed, setIsAgreed] = useState(false);
  return (
    <div className="page-container flex flex-col justify-between px-4 text-greyscale-10">
      <WithdrawalNotice isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
      <WithdrawalButton isAgreed={isAgreed} />
    </div>
  );
}

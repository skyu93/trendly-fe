'use client';
import { WithdrawButton } from '@/app/profile/WithdrawButton';
import { LoginInfoSection } from '@/app/profile/LoginInfoSection';
import { MemberInfoSection } from '@/app/profile/MemberInfoSection';
import { MarketingSection } from '@/app/profile/MarketingSection';
import { useState } from 'react';

// 회원 정보 타입 정의
type MemberInfo = {
  email: string;
  gender: string;
  birthdate: string;
  marketingConsent: boolean;
};

export default function Page() {
  const memberInfo: MemberInfo = {
    email: 'trendly@kakao.com',
    gender: 'male',
    birthdate: '2000-00-00',
    marketingConsent: true,
  };
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="w-full h-full flex flex-col justify-between mt-3 px-4 text-greyscale-10">
      <div>
        <LoginInfoSection email={memberInfo.email} />
        <MemberInfoSection memberInfo={memberInfo} isEditing={isEditing} setIsEditing={setIsEditing} />
        <MarketingSection memberInfo={memberInfo} isEditing={isEditing} />
      </div>
      <WithdrawButton isEditing={isEditing} />
    </div>
  );
}

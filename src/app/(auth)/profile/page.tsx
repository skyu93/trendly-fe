'use client';
import { WithdrawButton } from '@/app/(auth)/profile/WithdrawButton';
import { LoginInfoSection } from '@/app/(auth)/profile/LoginInfoSection';
import { MemberInfoSection } from '@/app/(auth)/profile/MemberInfoSection';
import { MarketingSection } from '@/app/(auth)/profile/MarketingSection';
import { useState } from 'react';
import { useUser } from '@/hooks/user/useUser';
import { isNil } from 'es-toolkit/compat';

export default function Page() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  if (isNil(user)) {
    return null;
  }

  return (
    <div className="page-container flex flex-col justify-between px-4 text-greyscale-10">
      <div>
        <LoginInfoSection email={user.email} />
        <MemberInfoSection user={user} isEditing={isEditing} setIsEditing={setIsEditing} />
        <MarketingSection user={user} isEditing={isEditing} />
      </div>
      <WithdrawButton isEditing={isEditing} />
    </div>
  );
}

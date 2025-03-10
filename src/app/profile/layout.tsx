import { ReactNode } from 'react';
import ProfileHeader from '@/app/profile/ProfileHeader';

export default function ProfileLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <ProfileHeader />
      {children}
    </>
  );
}

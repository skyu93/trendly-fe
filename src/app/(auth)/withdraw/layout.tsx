import { ReactNode } from 'react';
import WithdrawHeader from '@/app/(auth)/withdraw/WithdrawHeader';

export default function WithdrawLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <WithdrawHeader />
      {children}
    </>
  );
}

import { ReactNode } from 'react';
import WithdrawHeader from '@/app/withdraw/WithdrawHeader';

export default function WithdrawLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <WithdrawHeader />
      {children}
    </>
  );
}

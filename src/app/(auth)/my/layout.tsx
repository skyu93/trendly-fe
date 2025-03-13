import { ReactNode } from 'react';
import MyHeader from '@/app/(auth)/my/MyHeader';
import { GlobalFooterNavi } from '@/app/GlobalFooterNavi';

export default function MyLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <MyHeader />
      {children}
      <GlobalFooterNavi />
    </>
  );
}

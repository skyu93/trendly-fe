import { ReactNode } from 'react';
import KeywordsHeader from '@/app/keywords/KewordsHeader';
import { GlobalFooterNavi } from '@/app/GlobalFooterNavi';

export default function KeywordsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <KeywordsHeader />
      {children}
      <GlobalFooterNavi />
    </>
  );
}

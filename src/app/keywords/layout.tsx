import { ReactNode } from 'react';
import KeywordsHeader from '@/app/keywords/KewordsHeader';
import { GlobalFooterNavi } from '@/app/GlobalFooterNavi';

export default function KeywordsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="page-container">
      <KeywordsHeader />
      {children}
      <GlobalFooterNavi />
    </div>
  );
}

import { ReactNode } from 'react';
import { GlobalFooterNavi } from '@/app/GlobalFooterNavi';
import CommentHeader from '@/app/(auth)/comment/CommentHeader';

export default function KeywordsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <CommentHeader />
      {children}
      <GlobalFooterNavi />
    </>
  );
}

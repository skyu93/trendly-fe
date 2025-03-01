import { ReactNode } from 'react';
import KeywordsHeader from '@/app/keywords/KewordsHeader';

export default function KeywordsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <KeywordsHeader />
      {children}
    </>
  );
}

import { ReactNode } from 'react';
import { GlobalFooterNavi } from '@/app/GlobalFooterNavi';
import ChatsHeader from '@/app/(auth)/chats/ChatsHeader';

export default function KeywordsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <ChatsHeader />
      {children}
      <GlobalFooterNavi />
    </>
  );
}

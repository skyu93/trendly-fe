import { ReactNode } from 'react';
import { GlobalFooterNavi } from '@/app/GlobalFooterNavi';
import ChatsHeader from '@/app/chats/ChatsHeader';

export default function KeywordsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="page-container">
      <ChatsHeader />
      {children}
      <GlobalFooterNavi />
    </div>
  );
}

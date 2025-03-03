import { ReactNode } from 'react';
import { GlobalFooterNavi } from '@/app/GlobalFooterNavi';
import MyHeader from '@/app/my/MyHeader';

export default function MyLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="page-container">
      <MyHeader />
      {children}
      <GlobalFooterNavi />
    </div>
  );
}

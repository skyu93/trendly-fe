import { ReactNode } from 'react';
import SvgIcon from '@/components/SvgIcon';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <header className="h-[49px] flex items-center justify-center px-4">
        <SvgIcon id="logo" color="primary" className="absolute left-4" />
        <span>키워드 순위</span>
      </header>

      <div className={`h-[calc(100vh-109px)]`}>{children}</div>
    </div>
  );
}

import './reset.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReactNode } from 'react';
import SplashScreen from '@/app/SplashScreen';
import localFont from 'next/font/local';
import SideContainer from '@/app/SideContainer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const suite = localFont({
  src: '../../public/fonts/SUITE-Variable.woff2',
  variable: '--font-suite',
  display: 'swap', // 폰트 로딩 중 텍스트 표시 방식
  preload: true, // 폰트 미리 로드 여부
});

export const metadata: Metadata = {
  title: 'Trendly',
  description: '당신의 생각이 트렌드가 되는 순간',
  keywords: '이슈, 트렌드, 키워드',
  openGraph: {
    title: 'Trendly',
    description: '당신의 생각이 트렌드가 되는 순간',
    type: 'website',
    url: 'https://example.com',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 800,
        height: 600,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${suite.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SideContainer />
        <main>
          <SplashScreen />
          {children}
        </main>
      </body>
    </html>
  );
}

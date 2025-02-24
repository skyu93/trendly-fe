import './reset.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReactNode } from 'react';
import SplashScreen from '@/app/SplashScreen';
import logoHorizontal from '@/assets/logo-horizontal.png';
import Image from 'next/image';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="fixed left-0 z-0 h-full w-[calc(50vw+45px)] items-center overflow-hidden hidden lg:flex lg:p-16 xl:p-40">
          <div className="max-w-md">
            <Image src={logoHorizontal} alt="로고 이미지" className="mb-8 md:mb-10" />

            <div>
              <h2 className="text-6xl font-bold text-white leading-tight whitespace-nowrap">
                당신이 생각이
                <br />
                트렌드가 되는 순간
              </h2>

              <div className="mt-28 space-y-1">
                <p className="text-sm sm:text-base text-greyscale-40">핫한 트렌드, 빠르게 확인!</p>
                <p className="text-sm sm:text-base text-greyscale-40">
                  트렌들리에서 실시간 키워드를 보고, 자유롭게 의견을 나눠보세요
                </p>
                <p className="text-sm sm:text-base text-greyscale-40">지금, 세상의 관심을 가장 가까이에서 경험하세요</p>
              </div>
            </div>
          </div>
        </div>

        <main>
          <SplashScreen />
          {children}
        </main>
      </body>
    </html>
  );
}

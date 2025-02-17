import './reset.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReactNode } from 'react';
import { useAppState } from '@/hooks/app-state/useAppState';
import { Splash } from '@/components/Splash';


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
    <main>
      {children}
    </main>
    </body>
    </html>
  );
}

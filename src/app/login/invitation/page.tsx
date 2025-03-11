'use client';
import KakaoButton from '@/app/login/kakaoButton';
import Image from 'next/image';
import logo from '@/assets/logo.svg';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route';
import { X } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="w-full h-screen px-6 relative flex flex-col items-center justify-center">
      <Link
        href={ROUTE_PATH.KEYWORDS}
        className="absolute top-2 left-6 flex items-center justify-end text-sm hover:cursor-pointer hover:font-bold"
      >
        <X className="w-6 h-6 text-greyscale-20 hover:text-greyscale-50" />
      </Link>
      <Image src={logo} alt="logo" />
      <div className="w-full flex flex-col items-center">
        <span className="text-2xl font-bold my-3">지금 핫한 트렌드를 알아볼까요?</span>
        <div className="flex flex-col items-center text-sm text-greyscale-50">
          <span>먼저 로그인이 필요해요 =)</span>
          <span>지금 바로 가입하고 트렌드의 주인공이 되어보세요</span>
        </div>
      </div>
      <KakaoButton className="mt-40" />
    </div>
  );
}

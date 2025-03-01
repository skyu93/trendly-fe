'use client';
import KakaoButton from '@/app/login/kakaoButton';
import Image from 'next/image';
import logo from '@/assets/logo.svg';

export default function LoginPage() {
  return (
    <div className="w-full h-screen px-6 relative flex flex-col items-center justify-center">
      <Image src={logo} alt="logo" className="" />
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

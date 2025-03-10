'use client';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route';
import KakaoButton from '@/app/login/kakaoButton';
import Image from 'next/image';
import logoWithBrandImg from '@/assets/logo-with-brand.webp';

export default function LoginPage() {
  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center p-6">
      <Image width={144} height={148} src={logoWithBrandImg} alt="로고 이미지" />
      <KakaoButton className="mt-40" />
      <Link className="underline m-4 hover:text-blue-800 text-greyscale-40" href={ROUTE_PATH.KEYWORDS}>
        둘러보기
      </Link>
    </div>
  );
}

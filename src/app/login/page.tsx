import Link from 'next/link';
import KakaoButton from '@/app/auth/kakaoButton';
import { ROUTE_PATH } from '@/constants/route';

export default function loginPage() {
  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center">
      <KakaoButton />
      <Link className="underline hover:text-blue-800" href={ROUTE_PATH.MAIN}>
        둘러보기
      </Link>
    </div>
  );
}

import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route';
import logoError from '@/assets/logo-error.png';
import Image from 'next/image';

export default function notFound() {
  return (
    <div className="w-full h-screen px-6 relative flex flex-col items-center justify-center bg-primary text-greyscale-90">
      <Image src={logoError} alt="logo" className="" />
      <div className="w-full mt-6 flex flex-col items-center gap-y-3">
        <div className="text-[32px] font-extrabold">Oops!</div>
        <div>페이지를 찾을 수 없어요.</div>
        <div>메인에서 키워드 순위를 확인해 보세요!</div>
      </div>
      <Link
        className="w-full h-12 mt-40 bg-white text-greyscale-90 font-bold p-3 rounded-[12px] text-center"
        href={ROUTE_PATH.KEYWORDS}
      >
        메인으로 돌아가기
      </Link>
    </div>
  );
}

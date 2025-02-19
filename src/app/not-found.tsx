import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route';

export default function notFound() {
  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center">
      <div className="w-32 h-32 mx-auto mb-4 animate-pulse">
        {/* 로고나 아이콘을 넣을 위치 */}
        <div className="w-full h-full bg-[#EAFF4C] rounded-lg" />
      </div>
      <p className="text-xl font-bold">Oops, 페이지를 찾을 수 없어요.</p>
      <p className="text-gray-400 text-sm">메인으로 돌아가서 키워드 순위를 확인해보세요!</p>
      <Link className="bg-gray-300 text-black font-bold mt-20 p-3 rounded-md" href={ROUTE_PATH.MAIN}>
        메인으로 돌아가기
      </Link>
    </div>
  );
}

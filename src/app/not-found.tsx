import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route';

const BlackLogo = () => (
  <svg width="63" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M60.824 42.353 33.68 28.8a3.936 3.936 0 0 1-2.176-3.52V4.083c0-3.242-3.701-5.093-6.295-3.147L1.575 18.657A3.937 3.937 0 0 0 0 21.804v19.179a3.93 3.93 0 0 0 2.179 3.52L29.32 58.035a3.933 3.933 0 0 1 2.18 3.52v23.906c0 3.245 3.703 5.095 6.297 3.148l23.63-17.74A3.934 3.934 0 0 0 63 67.72v-21.85a3.935 3.935 0 0 0-2.176-3.52v.002z"
      fill="#000000"
    />
  </svg>
);
export default function notFound() {
  return (
    <div className="w-full h-screen px-6 relative flex flex-col items-center justify-center bg-primary text-greyscale-90">
      <BlackLogo />
      <div className="w-full mt-6 flex flex-col items-center gap-y-3">
        <div className="text-3xl font-bold">Oops!</div>
        <div className="text-sm">페이지를 찾을 수 없어요.</div>
        <div className="text-sm">메인에서 키워드 순위를 확인해 보세요!</div>
      </div>
      <Link
        className="w-full h-12 mt-40 bg-greyscale-80 text-white font-bold p-3 rounded-md text-center"
        href={ROUTE_PATH.KEYWORDS}
      >
        메인으로 돌아가기
      </Link>
    </div>
  );
}

import SvgIcon from '@/components/SvgIcon';
import { Button } from '@/components/ui/button/Button';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route';

export default function MyPage() {
  return (
    <div className="w-full h-full flex flex-col justify-between pt-8 gap-y-3">
      <div>
        <Link href={ROUTE_PATH.PROFILE} className="flex items-center justify-between h-12 hover:text-primary">
          <div>회원 정보 수정</div>
          <SvgIcon id="chevron-right" />
        </Link>
        <Link href={ROUTE_PATH.PROFILE} className="flex items-center justify-between h-12 hover:text-primary">
          <div>서비스 이용 약관</div>
          <SvgIcon id="chevron-right" />
        </Link>
        <Link href={ROUTE_PATH.PROFILE} className="flex items-center justify-between h-12 hover:text-primary">
          <div>개인 정보 처리 방침</div>
          <SvgIcon id="chevron-right" />
        </Link>
        <Link href={ROUTE_PATH.PROFILE} className="flex items-center justify-between h-12 hover:text-primary">
          <div>고객 센터</div>
          <SvgIcon id="chevron-right" />
        </Link>
      </div>
      <Button className="bg-greyscale-70 text-greyscale-30 mb-6">로그 아웃</Button>
    </div>
  );
}

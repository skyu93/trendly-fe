import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route';
import SvgIcon from '@/components/SvgIcon';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button/Button';

export default function MyPage() {
  return (
    <div className="w-full h-full flex flex-col justify-between pt-6 px-4 text-sm">
      <div className="flex flex-col gap-y-3">
        <Link href={ROUTE_PATH.PROFILE} className="flex items-center justify-between h-12 hover:text-primary">
          <div>회원 정보</div>
          <SvgIcon id="chevron-right" />
        </Link>
        <Separator className="bg-dark-02" />
        <a
          href="https://sprout-shallot-70b.notion.site/1-Trendly-19009a18538e80bcbc55f33b8f8e9b8a"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between h-12 hover:text-primary"
        >
          <div>서비스 이용 약관</div>
          <SvgIcon id="chevron-right" />
        </a>
        <a
          href="https://sprout-shallot-70b.notion.site/1-Trendly-19009a18538e80bcbc55f33b8f8e9b8a"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between h-12 hover:text-primary"
        >
          <div>개인정보 처리방침</div>
          <SvgIcon id="chevron-right" />
        </a>
        <Separator className="bg-dark-02" />
        <a
          href="https://sprout-shallot-70b.notion.site/1-Trendly-19009a18538e80bcbc55f33b8f8e9b8a"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between h-12 hover:text-primary"
        >
          <div>고객 센터</div>
          <SvgIcon id="chevron-right" />
        </a>
      </div>
      <Button variant="outline" className="mb-6">
        로그아웃
      </Button>
    </div>
  );
}

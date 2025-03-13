'use client';
import GlobalHeader from '@/app/GlobalHeader';
import SvgIcon from '@/components/icon/SvgIcon';
import { useRouter } from 'next/navigation';

export default function WithdrawHeader() {
  const router = useRouter();
  const goToBack = () => router.back();
  return (
    <GlobalHeader>
      <GlobalHeader.Icon>
        <div onClick={goToBack}>
          <SvgIcon id="arrow-left" className="text-greyscale-40 cursor-pointer hover:text-greyscale-30" />
        </div>
      </GlobalHeader.Icon>
      <GlobalHeader.Title>회원 탈퇴</GlobalHeader.Title>
    </GlobalHeader>
  );
}

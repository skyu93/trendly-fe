'use client';
import GlobalHeader from '@/app/GlobalHeader';
import SvgIcon from '@/components/icon/SvgIcon';
import { useRouter } from 'next/navigation';

export default function CommentHeader() {
  const router = useRouter();
  return (
    <GlobalHeader>
      <GlobalHeader.Icon>
        <span onClick={() => router.back()}>
          <SvgIcon id="arrow-left" className="text-greyscale-10 hover:text-greyscale-40 cursor-pointer" />
        </span>
      </GlobalHeader.Icon>
      <GlobalHeader.Title>댓글 내역</GlobalHeader.Title>
    </GlobalHeader>
  );
}

'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import kakao from '@/assets/kakao.png';

export function LoginInfoSection({ email }: { email: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-bold mb-2">로그인 정보</h2>
      <Card className="bg-[#1C1C1C] border-none rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Image width={21} height={21} src={kakao} alt="로고 이미지" />
            <div>
              <div className="text-greyscale-10 font-medium">카카오톡 계정 연결</div>
              <div className="text-greyscale-50 text-sm">{email}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

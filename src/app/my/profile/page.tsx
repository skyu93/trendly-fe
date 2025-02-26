import { Card, CardContent } from '@/components/ui/card';
import { WithdrawButton } from '@/app/my/profile/WithdrawButton';
import { MarketingConsentSwitch } from '@/app/my/profile/MarketingConsentSwitch';
import Image from 'next/image';
import kakao from '@/assets/kakao.png';

// 회원 정보 타입 정의
type MemberInfo = {
  email: string;
  gender: string;
  birthdate: string;
  marketingConsent: boolean;
};

async function getMemberInfo(): Promise<MemberInfo> {
  // 서버에서 데이터 가져오기 (예시)
  return {
    email: 'trendly@kakao.com',
    gender: '남성',
    birthdate: '2000.01.01',
    marketingConsent: true,
  };
}

export default async function Page() {
  const memberInfo = await getMemberInfo();
  return (
    <div className="w-full h-full flex flex-col justify-between mt-3 text-greyscale-10">
      <div>
        {/* 로그인 정보 섹션 */}
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-2">로그인 정보</h2>
          <Card className="bg-[#1C1C1C] border-none rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Image width={21} height={21} src={kakao} alt="로고 이미지" />
                <div>
                  <div className="text-greyscale-10 font-medium">카카오톡 계정 연결</div>
                  <div className="text-greyscale-50 text-sm">{memberInfo.email}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* 회원 정보 섹션 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-greyscale-10 font-bold text-sm">회원 정보</h2>
          </div>
          <Card className="bg-[#1C1C1C] border-none rounded-xl">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="text-greyscale-40 text-sm mb-1">성별</div>
                  <div className="text-greyscale-10">{memberInfo.gender}</div>
                </div>
                <div className="pt-4">
                  <div className="text-greyscale-40 text-sm mb-1">생년월일</div>
                  <div className="text-greyscale-10">{memberInfo.birthdate}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 마케팅 활용 동의 섹션 - 클라이언트 컴포넌트 필요 */}
        <div className="mb-10">
          <h2 className="text-greyscale-10 font-bold text-sm mb-2">마케팅 활용 동의</h2>
          <Card className="bg-[#1C1C1C] border-none rounded-xl">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-greyscale-10">광고성 정보 수신 동의</div>
                <MarketingConsentSwitch defaultChecked={memberInfo.marketingConsent} />
              </div>
              <div className="text-greyscale-40 text-xs mt-2">
                서비스의 중요 안내사항에 대한 정보는 위 수신 여부와 관계없이 발송됩니다.
              </div>
              <ul className="text-greyscale-40 text-xs mt-4 space-y-3">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>이벤트 등에머의 혜택, 수집 된 이메일을 마케팅 목적으로 활용 할 수 있습니다.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    제공되는 정보에 대한 상세 내용은 (서비스 이용약관 특징의 제10장)보 수집 및 이용 동의를 참고해 주시기
                    바랍니다.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <WithdrawButton />
    </div>
  );
}

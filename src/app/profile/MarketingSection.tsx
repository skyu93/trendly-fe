'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch/Switch';
import { useState } from 'react';

type MemberInfo = {
  email: string;
  gender: string;
  birthdate: string;
  marketingConsent: boolean;
};

interface Props {
  memberInfo: MemberInfo;
  isEditing: boolean;
}

export function MarketingSection({ memberInfo, isEditing }: Props) {
  const [checked, setChecked] = useState(memberInfo.marketingConsent);

  const handleChange = async (checked: boolean) => {
    setChecked(checked);
    // 여기서 API 요청을 보내서 서버에 동의 상태 업데이트
    try {
      console.log('마케팅 동의 상태 업데이트:', checked);
    } catch (error) {
      console.error('업데이트 실패:', error);
      setChecked(!checked); // 실패 시 상태 원복
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-greyscale-10 font-bold text-sm mb-2">마케팅 활용 동의</h2>
      <Card className="bg-[#1C1C1C] border-none rounded-xl">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-greyscale-10">광고성 정보 수신 동의</div>
            <Switch size="lg" disabled={isEditing} checked={checked} onCheckedChange={handleChange} />
          </div>
          <ul className="text-greyscale-40 text-[10px] mt-4 space-y-3">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>서비스의 중요 안내사항에 대한 정보는 위 수신 여부와 관계없이 발송됩니다.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>약관에 동의하실 경우, 수집 된 이메일을 마케팅 목적으로 활용 할 수 있습니다.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                제공되는 정보에 대한 상세 내용은
                <a
                  href="https://sprout-shallot-70b.notion.site/1-Trendly-19009a18538e80bcbc55f33b8f8e9b8a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {"\'(선택) 마케팅 목적의 개인정보 수집 및 이용 동의\'"}
                </a>
                를 참고해 주시기 바랍니다.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardTitle } from '@/components/ui/card';
import { Toggle } from '@/components/ui/tooggle/Toggle';
import { Check } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface Props {
  isAgreed: boolean;
  setIsAgreed: (state: boolean) => void;
}

export default function WithdrawalNotice({ isAgreed, setIsAgreed }: Props) {
  return (
    <div className="flex flex-col gap-y-4">
      <Card className="bg-dark-02 p-4">
        <CardTitle className="text-greyscale-10">회원 탈퇴 주의사항</CardTitle>
        <ul className="text-greyscale-40 text-[12px] mt-4 space-y-3">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>서비스의 중요 안내사항에 대한 정보는 위 수신 여부와 관계없이 발송됩니다.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>서비스의 중요 안내사항에 대한 정보는 위 수신 여부와 관계없이 발송됩니다.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>서비스의 중요 안내사항에 대한 정보는 위 수신 여부와 관계없이 발송됩니다.</span>
          </li>
        </ul>
      </Card>
      <div className="flex items-center" onClick={() => setIsAgreed(!isAgreed)}>
        <Toggle pressed={isAgreed}>
          <Check className="h-4 w-4" />
        </Toggle>
        <Label className="ml-3 cursor-pointer">안내 사항을 모두 확인했습니다.</Label>
      </div>
    </div>
  );
}

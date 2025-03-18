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
        <CardTitle className="text-greyscale-10">회원탈퇴 안내사항</CardTitle>
        <ul className="text-greyscale-40 text-[12px] mt-4 space-y-3">
          <li className="flex flex-col items-start">
            <span>1. 사용하고 계신 계정은 탈퇴할 경우 7일 간 재가입이 불가능합니다.</span>
            <span className="ml-3">• 회원탈퇴 후 동일한 계정으로 재가입은 7일 이후에 가능합니다.</span>
          </li>
          <li className="flex flex-col items-start">
            <span>2. 탈퇴 후 회원정보 및 Trendly 서비스 이용 기록은 모두 삭제됩니다.</span>
            <span className="ml-3">
              • 회원정보 및 채팅 이력, 이모지, 댓글 등 Trendly서비스 이용 기록은 모두 삭제되며, 삭제된 데이터는 복구되지
              않습니다. 삭제되는 내용을 확인하시고 필요한 데이터는 미리 백업을 해주세요
            </span>
            <span className="ml-3 mt-2">
              • 삭제 항목 : 사용자가 채팅방에서 입력한 내용/이모지, 닉네임, 사용자가 입력한 댓글, 참여한 채팅방 이력,
              이메일
            </span>
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

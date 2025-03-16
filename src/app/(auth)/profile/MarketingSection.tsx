'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch/Switch';
import { useMemo, useState } from 'react';
import { UserInfo } from '@/services/user/user.type';
import UserService from '@/services/user/userService';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useAuth } from '@/hooks/auth/useAuth';

interface Props {
  user: UserInfo;
  isEditing: boolean;
}

export function MarketingSection({ user, isEditing }: Props) {
  const [checked, setChecked] = useState(user.marketingOpt);
  const userService = useMemo(() => new UserService(), []);
  const { handleError } = useErrorHandler();
  const { setUser } = useAuth();
  const handleChange = async (checked: boolean) => {
    setChecked(checked);

    try {
      const user = await userService.update({ marketingOpt: checked });
      setUser(user);
    } catch (error) {
      setChecked(!checked); // 실패 시 상태 원복
      handleError(error);
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
                  href="https://www.notion.so/19b09a18538e80de9913d839acaf2900"
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

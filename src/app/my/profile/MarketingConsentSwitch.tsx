'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

export function MarketingConsentSwitch({ defaultChecked }: { defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = async (checked: boolean) => {
    setChecked(checked);
    // 여기서 API 요청을 보내서 서버에 동의 상태 업데이트
    try {
      // await updateMarketingConsent(checked);
      console.log('마케팅 동의 상태 업데이트:', checked);
    } catch (error) {
      console.error('업데이트 실패:', error);
      setChecked(!checked); // 실패 시 상태 원복
    }
  };

  return <Switch checked={checked} onCheckedChange={handleChange} className="bg-primary-60 text-white" />;
}

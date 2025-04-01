'use client';

import React from 'react';
import { Input } from '@/components/ui/input/Input';
import Image, { StaticImageData } from 'next/image';

interface Props {
  nickName: string;
  errorMessage?: string;
  avatar?: StaticImageData | string;
  onChange: (value: string) => void;
  clearError?: () => void;
  autoFocus?: boolean;
}

const NickNameForm: React.FC<Props> = ({ nickName, errorMessage, avatar, onChange, clearError, autoFocus = false }) => {
  const handleNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    clearError?.();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {avatar && <Image className="w-20 h-20" src={avatar} alt="프로필 이미지" />}
      <Input
        autoFocus={autoFocus}
        variant={errorMessage ? 'error' : 'default'}
        className="mt-4 mb-6"
        placeholder="닉네임을 입력해주세요."
        dataType="count"
        value={nickName}
        maxLength={10}
        errorMessage={errorMessage}
        onChange={handleNickNameChange}
      />
      <span className="text-xs text-greyscale-30">닉네임은 키워드별로 다르게 설정할 수 있어요.</span>
      <span className="text-xs text-greyscale-30">한/영/숫자 중 1개 이상을 사용해서 입력 가능해요.</span>
    </div>
  );
};

export default NickNameForm;

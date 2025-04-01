'use client';

import React, { useMemo, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { useChat } from '@/hooks/useChat';
import GlobalHeader from '@/app/GlobalHeader';
import { useToast } from '@/hooks/use-toast';
import { isEmpty } from 'es-toolkit/compat';
import NickNameForm from '@/components/composite/NickNameForm';

export interface Props {
  onClose(close: boolean): void;
}

const NicknameEditor: React.FC<Props> = ({ onClose }) => {
  const { changeUserNickname, currentUser, errorMessage, clearError } = useChat();
  const [nickName, setNickName] = useState<string>(currentUser?.nickName ?? '');
  const { toast } = useToast();

  const handleNickNameChange = (value: string) => {
    setNickName(value);
  };

  const isDisabled = useMemo(() => {
    if (nickName.length < 2 || !isEmpty(errorMessage)) {
      return true;
    }
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    return !regex.test(nickName);
  }, [nickName, errorMessage]);

  const handleChangeNickName = async () => {
    await changeUserNickname(nickName);
    toast({ description: '닉네임이 변경되었어요.' });
    onClose(true);
  };

  return (
    <div className="absolute w-full h-screen z-[999] px-3 bg-dark-01 flex flex-col items-center justify-between">
      <GlobalHeader>
        <GlobalHeader.Icon>
          <ChevronLeft className="hover:cursor-pointer" onClick={() => onClose(true)} />
        </GlobalHeader.Icon>
        <GlobalHeader.Title>닉네임 수정</GlobalHeader.Title>
      </GlobalHeader>
      <div />
      <NickNameForm
        nickName={nickName}
        errorMessage={errorMessage}
        avatar={currentUser?.avatar}
        onChange={handleNickNameChange}
        clearError={clearError}
        autoFocus
      />
      <Button variant="tertiary" className="w-full mb-9" disabled={isDisabled} onClick={handleChangeNickName}>
        수정하기
      </Button>
    </div>
  );
};

export default NicknameEditor;

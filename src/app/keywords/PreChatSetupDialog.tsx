'use client';

import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import useProfileImage from '@/hooks/useProfileImage';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/button/Button';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';

import { isEmpty } from 'es-toolkit/compat';
import NickNameForm from '@/components/composite/NickNameForm';

interface Props {
  roomId: number;
  roomName: string;
  open: boolean;
  onClose(open: boolean): void;
}

function PreChatSetupDialog({ roomId, roomName, open, onClose }: Props) {
  const { getRandomImage } = useProfileImage();
  const { isAuthorized } = useAuth();
  const [avatar, setAvatar] = useState(getRandomImage());
  const [nickName, setNickName] = useState('');
  const { joinRoom, errorMessage, clearError } = useChat();
  const { handleError } = useErrorHandler();
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setAvatar(getRandomImage());
      setNickName('');
    }
  }, [open, getRandomImage]);

  const isDisabled = useMemo(() => {
    if (nickName.length < 2 || !isEmpty(errorMessage)) {
      return true;
    }
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    return !regex.test(nickName);
  }, [nickName, errorMessage]);

  const handleEnter = async () => {
    try {
      if (!isAuthorized) {
        return router.push(ROUTE_PATH.LOGIN_INVITATION);
      }
      const success = await joinRoom({
        roomId,
        roomName,
        nickname: nickName,
        avatar,
      });
      if (success) {
        onClose(true);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-[80%]">
        <AlertDialogHeader>
          <AlertDialogTitle>닉네임 설정</AlertDialogTitle>
          <AlertDialogDescription>
            <NickNameForm
              nickName={nickName}
              errorMessage={errorMessage}
              avatar={avatar}
              onChange={setNickName}
              clearError={clearError}
              autoFocus
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="tertiary" className="h-12" disabled={isDisabled} onClick={handleEnter}>
            입장하기
          </Button>
          <Button variant="outline" className="h-12" onClick={() => onClose(false)}>
            취소
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default memo(PreChatSetupDialog);

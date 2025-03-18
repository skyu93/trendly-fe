import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input/Input';
import Image, { StaticImageData } from 'next/image';
import useProfileImage from '@/hooks/useProfileImage';

interface Props {
  open: boolean;
  onClose(open: boolean): void;
}
export default function PreChatSetupDialog({ open, onClose }: Props) {
  const actionState = useRef(false);
  const [avatar, setAvatar] = useState<StaticImageData>();
  const [nickname, setNickname] = useState<string>('');
  const { getRandomImage } = useProfileImage();

  useEffect(() => {
    if (open) {
      setAvatar(getRandomImage());
    }
  }, [open, getRandomImage]);

  const handleNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const isDisabled = useMemo(() => {
    if (nickname.length < 1) {
      return true;
    }
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    return !regex.test(nickname);
  }, [nickname]);

  return (
    <AlertDialog open={open} onOpenChange={() => onClose(actionState.current)}>
      <AlertDialogContent className="w-[80%]">
        <AlertDialogHeader>
          <AlertDialogTitle>닉네임 설정</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center justify-center">
            {avatar && <Image className="w-20 h-20" src={avatar} alt="무작위 프로필 이미지" />}
            <Input
              className="mt-4 mb-6"
              placeholder="닉네임을 입력해주세요."
              dataType="count"
              value={nickname}
              maxLength={10}
              onChange={handleNickName}
            />
            <span className="text-xs text-greyscale-30">닉네임은 키워드별로 다르게 설정할 수 있어요.</span>
            <span className="text-xs text-greyscale-30">한/영/숫자 중 1개 이상을 사용해서 입력 가능해요.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="h-12" disabled={isDisabled} onClick={() => (actionState.current = true)}>
            입장하기
          </AlertDialogAction>
          <AlertDialogCancel className="h-12">취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

'use client';

import { useMarketingConsent } from '@/hooks/useMarketingConsent';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button/Button';
import { useCallback, useMemo } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import UserService from '@/services/user/userService';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export default function MarketingConsentDrawer() {
  const { isOpen, setOpen } = useMarketingConsent();
  const { handleError } = useErrorHandler();
  const { setUser } = useAuth();
  const userService = useMemo(() => new UserService(), []);
  const handleClose = useCallback(
    async (agree: boolean) => {
      setOpen(false);
      if (agree) {
        try {
          const user = await userService.update({ marketingOpt: agree });
          setUser(user);
        } catch (error) {
          handleError(error);
        }
      }
    },
    [setOpen, setUser, userService, handleError],
  );

  return (
    <Drawer open={isOpen}>
      <DrawerContent className="bg-dark-02 z-40">
        <DrawerHeader>
          <DrawerTitle className="text-primary-60 text-[20px] font-bold flex flex-col items-center justify-center">
            <span>트렌드를 더 빠르게!</span>
            <span>놓치지 마세요!</span>
          </DrawerTitle>
          <DrawerDescription className="flex flex-col items-center justify-center">
            <span className="flex flex-col items-center justify-center text-greyscale-30">
              <span>트렌들리가 제공하는 최신 트렌드 소식,</span>
              <span>맞춤 콘텐츠, 특별혜택을 가장 먼저 받아보세요.</span>
            </span>
            <span className="flex flex-col items-center justify-center text-xs p-3 bg-greyscale-80 text-white rounded-[32px] mt-6">
              <span>마케팅 정보 수신 동의 철회는</span>
              <span>
                마이 {'>'} 회원 정보 {'>'} 마케팅 활용 동의에서 변경 가능합니다.
              </span>
            </span>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="tertiary" onClick={() => handleClose(true)}>
            네, 동의할게요
          </Button>
          <Button variant="outline" onClick={() => handleClose(false)}>
            다음에 받을게요
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

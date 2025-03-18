'use client';

import SvgIcon from '@/components/icon/SvgIcon';
import { Button } from '@/components/ui/button/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';
import PreChatSetupDialog from '@/app/keywords/PreChatSetupDialog';
import { useAuth } from '@/hooks/auth/useAuth';

interface Props {
  rank: number;
  keyword: string;
  activeIndex: number;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export default function KeywordRankCard({ rank, keyword, activeIndex, handleMouseEnter, handleMouseLeave }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const isActive = activeIndex === rank;

  const goToChatRoom = (actionState: boolean) => {
    if (actionState) {
      if (!isAuthenticated()) {
        router.push(ROUTE_PATH.LOGIN_INVITATION);
      } else {
        router.push(ROUTE_PATH.CHAT);
      }
    }
    setShowDialog(false);
  };
  return (
    <>
      <div
        className={`group flex items-center justify-between px-3 h-[67px] rounded-lg 
                   ${isActive ? 'bg-greyscale-20' : ''}
                   hover:bg-greyscale-20`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full 
                         ${isActive ? 'bg-greyscale-10 text-greyscale-90' : 'bg-greyscale-80 text-greyscale-10'} 
                         font-bold flex items-center justify-center 
                         group-hover:bg-greyscale-10 group-hover:text-greyscale-90`}
          >
            {rank}
          </div>
          <span className={`ml-[6px] ${isActive ? 'text-greyscale-90' : ''} group-hover:text-greyscale-90`}>
            {keyword}
          </span>
        </div>
        <Button
          onClick={() => setShowDialog(true)}
          variant="outline"
          className={`py-2 px-3 border-greyscale-80 bg-greyscale-90 
                     ${isActive ? 'text-primary-60' : 'text-greyscale-20'} 
                     group-hover:text-primary-60`}
        >
          <span>채팅하기</span>
          <SvgIcon id="add-chat" />
        </Button>
      </div>
      <PreChatSetupDialog open={showDialog} onClose={goToChatRoom} />
    </>
  );
}

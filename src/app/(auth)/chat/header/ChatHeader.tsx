'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ChatMenu from '@/app/(auth)/chat/header/ChatMenu';

interface Props {
  roomName: string;
  onOpenNicknameEditor: (isOpen: boolean) => void;
}

const ChatHeader: React.FC<Props> = ({ roomName, onOpenNicknameEditor }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4 text-white">
      <div className="flex items-center">
        <ArrowLeft className="w-4 h-4 mr-3 text-greyscale-40 hover:cursor-pointer" onClick={() => router.back()} />
        <div className="flex flex-col">
          <span className="font-bold">{roomName}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <ChatMenu openChangeNickName={onOpenNicknameEditor} />
      </div>
    </div>
  );
};

export default ChatHeader;

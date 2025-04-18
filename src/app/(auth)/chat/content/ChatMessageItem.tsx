'use client';

import React, { useMemo } from 'react';
import { useUser } from '@/hooks/user/useUser';
import { isNil } from 'es-toolkit/compat';
import { useChat } from '@/hooks/useChat';
import Image, { StaticImageData } from 'next/image';
import MessageText from '@/app/(auth)/chat/content/MessageText';
import { getRandomImage } from '@/lib/utils';

interface ChatMessageProps {
  text: string;
  userId: number;
}

const ChatMessageItem: React.FC<ChatMessageProps> = ({ text, userId }) => {
  const { user } = useUser();
  const { users } = useChat();

  const isOther = useMemo((): boolean => {
    if (isNil(user)) {
      return false;
    }
    return user.id !== userId;
  }, [user, userId]);

  const avatar = useMemo((): StaticImageData => {
    if (isNil(users) || isNil(users[userId])) {
      return getRandomImage();
    }
    return users[userId]?.avatar ?? getRandomImage();
  }, [users, userId, getRandomImage]);

  const nickName = useMemo((): string => {
    if (isNil(users) || isNil(users[userId])) {
      return '[trendly]';
    }
    return users[userId]?.nickName ?? '[trendly]';
  }, [users, userId]);

  return (
    <div className={`flex mb-4 ${isOther ? 'justify-start' : 'justify-end'}`}>
      {isOther && (
        <div className="flex flex-col items-center mr-2">
          {avatar && <Image className="aspect-square w-6 h-6" src={avatar} alt="프로필 이미지" />}
        </div>
      )}
      <div className="flex flex-col max-w-xs relative">
        {isOther && <span className="text-xs mb-1 text-greyscale-10">{nickName}</span>}
        <div
          className={`px-4 py-3 text-sm rounded-[32px] ${
            isOther ? 'bg-greyscale-80 text-white' : 'bg-primary-50 text-greyscale-90'
          }`}
        >
          <MessageText text={text} />
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;

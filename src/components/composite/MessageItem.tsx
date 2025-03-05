import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface Props {
  id: number;
  text: string;
  name: string;
  className?: string;
}

// 메시지 아이템 컴포넌트
const MessageItem: React.FC<Props> = ({ id, name, text, className }) => {
  return (
    <div key={id} className={`flex justify-start ${className}`}>
      <div className="flex flex-col items-center mr-2">
        <Avatar className="w-6 h-6">
          <AvatarImage width={24} height={24} src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col">
        <span className="text-xs mb-1 text-greyscale-10 max-w-full">{name ?? '-'}</span>
        <span className="px-4 py-3 text-sm rounded-[32px] bg-greyscale-80 text-white max-w-max break-words">
          {text}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;

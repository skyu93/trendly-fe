'use client';

import { useState } from 'react';
import MessageItem from '@/components/composite/MessageItem';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  name: string;
  text: string;
}

export default function Main() {
  // 상태로 메시지 배열을 관리합니다.
  const [messages] = useState<Message[]>([
    // 테스트 데이터 - 필요시 빈 배열 []로 변경하세요
    { id: 1, name: '등산하는 알파카 1111', text: '영차' },
    { id: 2, name: '지나가는 도마뱀', text: '엥 이게 왜 형이 주인공이라고 얘기하는 거야? 그냥 이해를 못 하신듯' },
  ]);

  return (
    <div className="page-container px-4 flex flex-col">
      <MessageItem className="mt-3" id={123} name={'수영하는 알파'} text={'형이 ㄹㅇ 찐주인공같 드라마...너무 슬픔'} />
      <Separator className="bg-greyscale-80 mt-4" />
      <div className="flex text-xs gap-x-1 mt-4">
        <span className="text-greyscale-20">댓글</span>
        <span className="text-primary-50">{messages.length}</span>
      </div>
      <ScrollArea className="flex flex-1 relative">
        {messages.length > 0 ? (
          messages.map(message => (
            <MessageItem key={message.id} className="mt-3" id={message.id} name={message.name} text={message.text} />
          ))
        ) : (
          <div className="absolute inset-0 m-auto w-fit h-fit">
            <span className="text-xs text-greyscale-40">작성된 댓글이 없어요!</span>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

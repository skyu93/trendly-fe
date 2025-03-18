'use client';

import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import ChatMenuSheet from '@/app/(auth)/chat/ChatMenuSheet';
import MessageItem, { MessageProps } from './ChatMessageItem';
import { useRouter } from 'next/navigation';

// 메시지 타입 정의 (MessageItem에서 export한 타입을 활용)
type Message = Omit<MessageProps, 'onLongPress' | 'selected'>;

// 채팅 데이터 예시
const initialMessages: Message[] = [
  {
    id: 1,
    isMine: false,
    text: '안녕하세요! 😊',
    reactions: [{ emoji: '😊', count: 2 }],
    replies: 1,
    nickname: '홍길동',
  },
  { id: 2, isMine: true, text: '네, 안녕하세요. 오늘 어떻게 지내세요?', reactions: [], replies: 0 },
  {
    id: 3,
    isMine: false,
    text: '잘 지내고 있어요. 프로젝트는 어떻게 진행되고 있나요? 🤔',
    reactions: [{ emoji: '😊', count: 1 }],
    replies: 2,
    nickname: '홍길동',
  },
  {
    id: 4,
    isMine: true,
    text: '거의 완료 단계에 있어요. 이번 주말까지 마무리할 예정입니다. 🎉',
    reactions: [{ emoji: '😊', count: 3 }],
    replies: 1,
  },
];

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>('');
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isSafari, setIsSafari] = useState<boolean>(false);
  const router = useRouter();

  // 사파리 브라우저 감지
  useEffect(() => {
    // 사파리 브라우저 감지 (iOS 및 macOS 둘 다 포함)
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(isSafariBrowser);

    // iOS 기기의 경우 추가 조치
    if (isSafariBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
      // 뷰포트 높이 조정
      const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };

      setViewportHeight();
      window.addEventListener('resize', setViewportHeight);
      return () => window.removeEventListener('resize', setViewportHeight);
    }
  }, []);

  // 채팅창이 항상 최신 메시지를 보여주도록 스크롤
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth'): void => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // 새 메시지가 추가될 때 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = (): void => {
      if (!chatContainerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // 메뉴가 열렸을 때 document 클릭 이벤트 리스너
  useEffect(() => {
    if (selectedMessageId !== null) {
      const handleClickOutside = (): void => {
        // 메뉴 외부 클릭 시 메뉴 닫기
        setSelectedMessageId(null);
      };

      document.addEventListener('click', handleClickOutside, true);
      document.addEventListener('touchend', handleClickOutside, true);

      return () => {
        document.removeEventListener('click', handleClickOutside, true);
        document.removeEventListener('touchend', handleClickOutside, true);
      };
    }
  }, [selectedMessageId]);

  // 메시지 롱프레스 핸들러
  const handleMessageLongPress = (messageId: number): void => {
    if (messageId === selectedMessageId) {
      setSelectedMessageId(null);
    } else {
      setSelectedMessageId(messageId);
    }
  };

  // 메시지 전송 핸들러
  const handleSendMessage = (): void => {
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: messages.length + 1,
      isMine: true,
      text: newMessage,
      reactions: [],
      replies: 0,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    setTimeout(() => {
      scrollToBottom('auto');
    }, 50);
  };

  // 입력 변경 핸들러
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewMessage(e.target.value);
  };

  // 키 입력 핸들러
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen" style={isSafari ? { height: 'calc(var(--vh, 1vh) * 100)' } : {}}>
      {/* 스크롤바 숨김 스타일 */}
      <style jsx global>{`
        :root {
          --vh: 1vh;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 채팅방 헤더 */}
      <div
        className="flex items-center justify-between p-4 text-white"
        style={
          isSafari
            ? {
                position: 'sticky',
                top: 0,
                zIndex: 10,
                marginTop: '50px', // 사파리 브라우저에 추가 마진
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }
            : {}
        }
      >
        <div className="flex items-center">
          <ArrowLeft className="w-4 h-4 mr-3 text-greyscale-40 hover:cursor-pointer" onClick={() => router.back()} />
          <div className="flex flex-col">
            <span className="font-bold">키워드</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ChatMenuSheet />
        </div>
      </div>

      {/* 채팅 메시지 영역 */}
      <div
        className="flex-1 p-4 overflow-y-auto hide-scrollbar"
        ref={chatContainerRef}
        style={{
          WebkitOverflowScrolling: 'touch',
          ...(isSafari ? { maxHeight: 'calc(100% - 150px)' } : {}), // 사파리에서 추가 높이 조정
        }}
      >
        {messages.map(message => (
          <MessageItem
            key={message.id}
            {...message}
            onLongPress={handleMessageLongPress}
            selected={selectedMessageId === message.id}
          />
        ))}
        <div ref={messagesEndRef} />

        {/* 스크롤 아래로 이동 버튼 */}
        {showScrollButton && (
          <button
            className={
              isSafari
                ? 'fixed bottom-24 right-4 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition-all z-10'
                : 'absolute bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition-all z-10'
            }
            onClick={() => scrollToBottom('smooth')}
          >
            <ChevronDown size={20} />
          </button>
        )}
      </div>

      {/* 메시지 입력 영역 */}
      <div className="p-4 border-greyscale-70">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="내용을 입력해 주세요"
            className="flex-1 p-2 mx-2 rounded-full bg-greyscale-80 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button onClick={handleSendMessage} className="w-10 h-10 rounded-full">
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;

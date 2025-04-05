'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ChatMessageItem from './ChatMessageItem';
import { map } from 'es-toolkit/compat';
import { ChatMessage } from '@/services/chat/chat.type';

interface Props {
  messages: ChatMessage[];
  onLoadPreviousMessages: () => void;
}

const ChatMessageList: React.FC<Props> = ({ messages, onLoadPreviousMessages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const topObserverRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState<boolean>(true);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [canTriggerTopEvent, setCanTriggerTopEvent] = useState<boolean>(true);
  const prevMessagesLengthRef = useRef<number>(0);
  const messagesRef = useRef<ChatMessage[]>([]);

  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prevScrollTopRef = useRef<number>(0);

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = 'smooth'): void => {
      if (containerRef.current) {
        const scrollHeight = containerRef.current.scrollHeight;
        containerRef.current.scrollTo({
          top: scrollHeight,
          behavior: behavior,
        });
      }
      setShouldAutoScroll(true);
    },
    [setShouldAutoScroll],
  );

  // 여러 번 스크롤 시도를 위한 함수
  const tryScrollToBottom = useCallback(
    (attempts = 3, delay = 100): void => {
      scrollToBottom('auto');

      if (attempts > 1) {
        setTimeout(() => {
          tryScrollToBottom(attempts - 1, delay);
        }, delay);
      } else {
        // 마지막 시도는 부드럽게
        setTimeout(() => {
          scrollToBottom('smooth');
        }, delay);
      }
    },
    [scrollToBottom],
  );

  useEffect(() => {
    if (!topObserverRef.current || messages.length === 0) return;

    const topObserverOptions = {
      root: containerRef.current,
      threshold: 0.1,
      rootMargin: '100px',
    };

    const observedElement = topObserverRef.current;

    const topObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && canTriggerTopEvent) {
          onLoadPreviousMessages();
          setCanTriggerTopEvent(false);
        }
      });
    }, topObserverOptions);

    topObserver.observe(observedElement);

    return () => {
      topObserver.unobserve(observedElement);
    };
  }, [messages.length, onLoadPreviousMessages, canTriggerTopEvent]);

  useEffect(() => {
    const handleScroll = (): void => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isBottom = scrollHeight - scrollTop - clientHeight < 100;

      setShowScrollButton(!isBottom);
      setShouldAutoScroll(isBottom);

      setIsScrolling(true);

      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      scrollTimerRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);

      const currentScrollTop = scrollTop;

      if (!canTriggerTopEvent && currentScrollTop > 50) {
        setCanTriggerTopEvent(true);
      }

      prevScrollTopRef.current = currentScrollTop;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (scrollTimerRef.current) {
          clearTimeout(scrollTimerRef.current);
        }
      };
    }
  }, [canTriggerTopEvent]);

  useEffect(() => {
    // 메시지 배열 참조 업데이트
    const messagesDiff = messages.length - messagesRef.current.length;
    messagesRef.current = messages;

    if (!shouldAutoScroll || messages.length === 0) return;

    // 메시지가 추가된 경우만 스크롤 (일반적인 채팅 케이스)
    if (messagesDiff > 0 && messagesDiff <= 3) {
      setTimeout(() => {
        scrollToBottom('smooth');
      }, 100);
    }
    // 메시지가 많이 한번에 추가된 경우 (초기 로드 또는 대량 메시지)
    else if (messagesDiff > 3 || messages.length > prevMessagesLengthRef.current + 3) {
      tryScrollToBottom(3, 150);
    }

    // 현재 메시지 수 저장
    prevMessagesLengthRef.current = messages.length;
  }, [messages, shouldAutoScroll, tryScrollToBottom, setShouldAutoScroll, scrollToBottom]);

  // 컴포넌트 마운트 시 초기 스크롤
  useEffect(() => {
    if (messages.length > 0) {
      // 여러 번 시도
      tryScrollToBottom(3, 100);
    }
  }, [messages.length, tryScrollToBottom]);

  return (
    <div
      className={`flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-gray-500/50 ${
        isScrolling ? 'scrollbar-thumb-gray-500/50' : 'scrollbar-thumb-transparent'
      }`}
      ref={containerRef}
      onMouseEnter={() => setIsScrolling(true)}
      onMouseLeave={() => setTimeout(() => setIsScrolling(false), 200)}
    >
      <div ref={topObserverRef} className="h-px w-full" />

      {map(messages, (message, idx) => (
        <ChatMessageItem key={`${message.messageId}-${idx}`} userId={message.userId} text={message.message} />
      ))}
      <div ref={messagesEndRef} />

      {showScrollButton && (
        <button
          className="absolute bottom-20 right-4 bg-greyscale-70 text-white rounded-full p-2 shadow-lg transition-all z-10"
          onClick={() => scrollToBottom('smooth')}
        >
          <ChevronDown size={20} />
        </button>
      )}
    </div>
  );
};

export default ChatMessageList;

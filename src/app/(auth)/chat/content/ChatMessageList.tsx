'use client';

import React, { useCallback, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import ChatMessageItem from './ChatMessageItem';
import { map } from 'es-toolkit/compat';
import { ChatMessage } from '@/services/chat/chat.type';
import { useScrollHandler } from '@/hooks/useScrollHandler';

interface Props {
  messages: ChatMessage[];
  onLoadPreviousMessages: () => Promise<void>;
}

const ChatMessageList: React.FC<Props> = ({ messages, onLoadPreviousMessages }) => {
  const {
    containerRef,
    topObserverRef,
    isScrolling,
    isLoadingPrevious,
    showScrollButton,
    visibleScrollThumb,
    setVisibleScrollThumb,
    scrollToBottom,
  } = useScrollHandler({
    onIntersecting() {
      loadPreviousMessages();
    },
  });

  // 이전 메시지 로드 처리 함수
  const loadPreviousMessages = useCallback(async () => {
    if (isLoadingPrevious.current) {
      return;
    }
    try {
      isLoadingPrevious.current = true;
      // 현재 스크롤 위치 기억
      const scrollPosition = containerRef.current?.scrollTop || 0;
      const scrollHeight = containerRef.current?.scrollHeight || 0;

      await onLoadPreviousMessages();

      // 스크롤 위치 조정 (불필요한 스크롤 방지)
      if (containerRef.current && scrollPosition > 0) {
        setTimeout(() => {
          if (containerRef.current) {
            const newScrollHeight = containerRef.current.scrollHeight;
            const heightDiff = newScrollHeight - scrollHeight;
            containerRef.current.scrollTop = scrollPosition + heightDiff;
          }
        }, 0);
      } else if (!isScrolling.current) {
        // 스크롤 중이 아닐 때만 맨 아래로 스크롤
        scrollToBottom();
      }
    } catch (error) {
      console.error('이전 메시지 로드 중 오류 발생:', error);
    } finally {
      setTimeout(() => {
        isLoadingPrevious.current = false;
      }, 300);
    }
  }, [onLoadPreviousMessages, containerRef, isLoadingPrevious, isScrolling, scrollToBottom]);

  // 새 메시지가 추가되었을 때 맨 아래에 있었다면 자동 스크롤
  useEffect(() => {
    const messageCountChanged = messages.length > 0;
    if (messageCountChanged && !isScrolling.current) {
      scrollToBottom('instant');
    }
  }, [messages, scrollToBottom, isScrolling]);

  return (
    <div
      className={`flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-gray-500/50 ${
        visibleScrollThumb ? 'scrollbar-thumb-gray-500/50' : 'scrollbar-thumb-transparent'
      }`}
      ref={containerRef}
      onMouseEnter={() => setVisibleScrollThumb(true)}
      onMouseLeave={() => setTimeout(() => setVisibleScrollThumb(false), 200)}
    >
      <div ref={topObserverRef} className="h-px w-full" style={{ opacity: 0 }} />

      {map(messages, (message, idx) => (
        <ChatMessageItem key={`${message.messageId}-${idx}`} userId={message.userId} text={message.message} />
      ))}

      {showScrollButton && (
        <button
          className="absolute bottom-20 right-4 bg-greyscale-70 text-white rounded-full p-2 shadow-lg transition-all z-10"
          onClick={() => scrollToBottom()}
          aria-label="맨 아래로 스크롤"
        >
          <ChevronDown size={20} />
        </button>
      )}
    </div>
  );
};

export default ChatMessageList;

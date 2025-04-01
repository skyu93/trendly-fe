'use client';

import React, { useEffect, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import NicknameEditor from '@/app/(auth)/chat/NicknameEditor';
import ChatHeader from './header/ChatHeader';
import ChatMessageList from './content/ChatMessageList';
import ChatInput from './ChatInput';
import { useErrorHandler } from '@/hooks/useErrorHandler';

const ChatRoom: React.FC = () => {
  const { messages, currentRoomName, sendMessage, loadPreviousMessages, error, isLoading } = useChat();
  const [isNicknameEditorVisible, setNicknameEditorVisible] = useState<boolean>(false);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [handleError, error]);

  const handleLoadPreviousMessages = (): void => {
    if (messages.length === 0 || isLoading || !loadPreviousMessages) {
      return;
    }
    loadPreviousMessages();
  };

  const handleOpenNicknameEditor = (isOpen: boolean): void => {
    setNicknameEditorVisible(isOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {isNicknameEditorVisible && <NicknameEditor onClose={(flag: boolean) => setNicknameEditorVisible(!flag)} />}

      <ChatHeader roomName={currentRoomName ?? ''} onOpenNicknameEditor={handleOpenNicknameEditor} />

      <ChatMessageList messages={messages} onLoadPreviousMessages={handleLoadPreviousMessages} />

      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatRoom;

'use client';

import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = (): void => {
    if (message.trim() === '') return;

    onSendMessage(message);
    setMessage('');

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="p-4 border-greyscale-70">
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="내용을 입력해 주세요"
          className="flex-1 p-2 mx-2 rounded-full bg-greyscale-80 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          maxLength={500}
          autoFocus
        />
        <Button onClick={handleSend} className="w-10 h-10 rounded-full">
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;

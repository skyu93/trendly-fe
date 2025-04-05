'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';

interface Props {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<Props> = ({ onSendMessage }) => {
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

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey && !e.repeat) {
      e.preventDefault();
      console.log('handleKeyPress - Enter');
      handleSend();
    }
  };

  return (
    <div className="p-4 border-greyscale-70" onKeyPress={handleKeyPress}>
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={handleInputChange}
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

import React from 'react';
import ChatView from '@/app/(auth)/chat/ChatView';

// 타입 정의
// interface Reaction {
//   emoji: string;
//   count: number;
// }
//
// interface Message {
//   id: number;
//   sender: 'me' | 'other';
//   text: string;
//   time: string;
//   reactions: Reaction[];
//   replies: number;
//   nickname?: string;
// }
//
// const initialMessages: any[] = [
//   { id: 1, sender: 'other', text: '안녕하세요! 😊', time: '09:30', reactions: [{emoji: '😊', count: 2}], replies: 1, nickname: '김철수' },
//   { id: 2, sender: 'me', text: '네, 안녕하세요. 오늘 어떻게 지내세요?', time: '09:31', reactions: [], replies: 0 },
//   { id: 3, sender: 'other', text: '잘 지내고 있어요. 프로젝트는 어떻게 진행되고 있나요? 🤔', time: '09:33', reactions: [{emoji: '😊', count: 1}], replies: 2, nickname: '김철수' },
//   { id: 4, sender: 'me', text: '거의 완료 단계에 있어요. 이번 주말까지 마무리할 예정입니다. 🎉', time: '09:35', reactions: [{emoji: '😊', count: 3}], replies: 1 },
// ];

export default function ChatPage() {
  return <ChatView />;
}

import { create } from 'zustand/index';
import { ChatMessage, JoinedChatRoom } from '@/services/chat/chat.type';
import { StaticImageData } from 'next/image';
import { isBrowser } from '@/lib/utils';

export const CHAT_STORAGE_KEY = {
  CURRENT_ROOM_ID: 'chat_current_room_id',
  CURRENT_ROOM_NAME: 'chat_current_room_name',
};
const getChatStorageRoomId = (): number | null => {
  if (!isBrowser()) return null;

  const storedValue = sessionStorage.getItem(CHAT_STORAGE_KEY.CURRENT_ROOM_ID);
  return storedValue ? Number(storedValue) : null;
};

const getChatStorageRoomName = (): string | null => {
  if (!isBrowser()) return null;

  return sessionStorage.getItem(CHAT_STORAGE_KEY.CURRENT_ROOM_NAME);
};
export const useChatStore = create<{
  messages: ChatMessage[];
  currentRoomId: number | null;
  currentRoomName: string | null;
  users: Record<number, { nickName: string; avatar: StaticImageData }>;
  joinedChatRooms: JoinedChatRoom[];

  setMessages(messages: ChatMessage[]): void;
  addMessage(messages: ChatMessage): void;
  setCurrentRoomId(roomId: number | null): void;
  setCurrentRoomName(roomName: string | null): void;
  setUsers(users: Record<number, { nickName: string; avatar: StaticImageData }>): void;
  updateUser(user: { userId: number; nickname: string; avatar: StaticImageData }): void;
  setJoinedChatRooms(rooms: JoinedChatRoom[]): void;
}>(set => ({
  messages: [],
  currentRoomId: getChatStorageRoomId(),
  currentRoomName: getChatStorageRoomName(),
  users: {},
  joinedChatRooms: [],

  setMessages: (messages: ChatMessage[]) => set({ messages }),
  addMessage: (message: ChatMessage) =>
    set(state => ({
      messages: [...state.messages, message],
    })),
  setCurrentRoomId: (roomId: number | null) => {
    // 세션 스토리지에 저장 (브라우저 환경에서만)
    if (isBrowser()) {
      if (roomId === null) {
        sessionStorage.removeItem(CHAT_STORAGE_KEY.CURRENT_ROOM_ID);
      } else {
        sessionStorage.setItem(CHAT_STORAGE_KEY.CURRENT_ROOM_ID, roomId.toString());
      }
    }
    set({ currentRoomId: roomId });
  },
  setCurrentRoomName: (roomName: string | null) => {
    // 세션 스토리지에 저장 (브라우저 환경에서만)
    if (isBrowser()) {
      if (roomName === null) {
        sessionStorage.removeItem(CHAT_STORAGE_KEY.CURRENT_ROOM_NAME);
      } else {
        sessionStorage.setItem(CHAT_STORAGE_KEY.CURRENT_ROOM_NAME, roomName);
      }
    }
    set({ currentRoomName: roomName });
  },
  setUsers: (users: Record<number, { nickName: string; avatar: StaticImageData }>) => {
    set({ users });
  },
  updateUser: ({ userId, nickname, avatar }: { userId: number; nickname: string; avatar: StaticImageData }) =>
    set(state => ({
      users: {
        ...state.users,
        [userId]: { nickName: nickname, avatar },
      },
    })),
  setJoinedChatRooms: (rooms: JoinedChatRoom[]) => set({ joinedChatRooms: rooms }),
}));

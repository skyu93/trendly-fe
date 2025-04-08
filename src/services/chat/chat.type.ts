export interface ChatMessage {
  messageId: number;
  message: string;
  userId: number;
  nickname?: string;
}

export interface ChatServiceConfig {
  brokerURL: string;
  connectHeaders?: Record<string, string>;
}

export interface ChatEventHandlers {
  onConnect: () => void;
  onDisconnect: () => void;
  onError: (error: Error) => void;
  onEventReceived: (event: ReceivedEvent) => void;
}

export interface ChatConnectionConfig {
  brokerURL: string;
  connectHeaders?: Record<string, string>;
}

export interface ChatConnectionEventHandlers {
  onConnect: () => void;
  onDisconnect: () => void;
  onError: (error: Error) => void;
  onMessageReceived: (event: ReceivedEvent) => void;
}

export interface ChatJoin {
  roomId: number;
  nickname?: string;
}

export interface ChatMessageResponse {
  messages: ChatMessage[];
  nicknames: Record<string, string>;
}

export interface ChatLeave {
  roomId: number;
  userId: number;
}

export interface ChatSendMessage {
  roomId: number;
  userId: number;
  message: string;
}

export interface ChatUpdateNickname {
  roomId: number;
  userId: number;
  nickname: string;
}

export type ReceivedEvent = UserMessageEvent | UserJoinEvent;

export interface UserJoinEvent {
  eventType: 'USER_ENTERED';
  data: string;
}

export interface UserMessageEvent {
  eventType: 'NEW_MESSAGE';
  data: ChatMessage;
}

export interface EnterRoomResponse {
  chatMessageDto: ChatMessage[];
  nicknameMap: Record<string, string>;
}

export interface LoadPreviousMessagesResponse {
  chatMessageDto: ChatMessage[];
  nicknameMap: Record<string, string>;
}

export interface UpdateNicknameResponse {
  userId: number;
  nickname: string;
}

export interface JoinedChatRoom {
  roomId: number;
  keyword: string;
  participantCount: number;
}

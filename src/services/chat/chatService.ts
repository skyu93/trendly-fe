import { isEmpty, isNil } from 'es-toolkit/compat';
import { ApiError } from '@/services/apiError';
import { ERROR_CODES } from '@/constants/errorCodes';
import { AxiosError } from 'axios';
import {
  ChatEventHandlers,
  ChatJoin,
  ChatJoinResponse,
  ChatLeave,
  ChatMessage,
  ChatSendMessage,
  ChatServiceConfig,
  ChatUpdateNickname,
  EnterRoomResponse,
} from '@/services/chat/chat.type';
import { ChatApi } from '@/services/chat/chatApi';
import { ChatConnection } from './ChatConnection';

/**
 * 채팅 서비스 클래스
 * 채팅 관련 모든 기능을 통합적으로 관리합니다.
 */
export class ChatService {
  private connection: ChatConnection;

  private eventHandlers: ChatEventHandlers = {
    onConnect: () => {},
    onDisconnect: () => {},
    onError: () => {},
    onEventReceived: () => {},
  };

  constructor({ brokerURL, connectHeaders = {} }: ChatServiceConfig) {
    // 채팅 연결 관리 객체 생성
    this.connection = new ChatConnection({ brokerURL, connectHeaders });

    // 이벤트 핸들러 연결
    this.connection.setEventHandlers({
      onConnect: () => this.eventHandlers.onConnect(),
      onDisconnect: () => this.eventHandlers.onDisconnect(),
      onError: error => this.eventHandlers.onError(error),
      onMessageReceived: event => this.eventHandlers.onEventReceived(event),
    });
  }

  public setEventHandlers(handlers: Partial<ChatEventHandlers>): void {
    this.eventHandlers = { ...this.eventHandlers, ...handlers };
  }

  public connect(): void {
    this.connection.connect();
  }
  public disconnect(): void {
    this.connection.disconnect();
  }
  public reconnect(): void {
    this.connection.reconnect();
  }
  public isConnected(): boolean {
    return this.connection.isConnected();
  }

  public async joinRoom({ roomId, nickname }: ChatJoin): Promise<ChatJoinResponse | null> {
    if (!this.connection.isConnected()) {
      this.connection.connect();
      return null;
    }

    try {
      const { chatMessageDto, nicknameMap }: EnterRoomResponse = await ChatApi.enter({ roomId, nickname });

      // 방 구독
      const subscribed = this.connection.subscribeToRoom(roomId);
      if (!subscribed) {
        this.eventHandlers.onError(new Error('채팅방 구독에 실패했습니다.'));
        return null;
      }

      return {
        messages: [...chatMessageDto],
        nicknames: nicknameMap,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      const { message, status } = axiosError;

      if (status === 400) {
        // 잘못된 닉네임 (중복, 20자 초과)
        this.eventHandlers.onError(new ApiError({ code: ERROR_CODES.CHAT_NICKNAME_INVALID }));
      } else if (status === 404) {
        // 채팅방 또는 사용자 없음
        this.eventHandlers.onError(
          new ApiError({
            code: ERROR_CODES.REQUIRED_FIELD,
            message: message ?? '필수 필드가 누락되었습니다.',
          }),
        );
      } else {
        this.eventHandlers.onError(error as Error);
      }

      return null;
    }
  }

  public async leaveRoom({ roomId, userId }: ChatLeave): Promise<void> {
    // 구독 해제
    this.connection.unsubscribe();

    if (isNil(roomId) || isNil(userId)) {
      return;
    }

    try {
      await ChatApi.leave({ roomId, userId });
    } catch (error) {
      this.eventHandlers.onError(error instanceof Error ? error : new Error('채팅방 퇴장 중 오류가 발생했습니다.'));
    }
  }

  public sendMessage({ roomId, userId, message }: ChatSendMessage): void {
    if (!this.connection.isConnected()) {
      this.eventHandlers.onError(new Error('메시지를 보낼 수 없습니다. 연결이 끊어졌습니다.'));
      return;
    }

    if (!roomId) {
      return;
    }

    this.connection.publish(
      `/app/rooms/${roomId}/message.send`,
      JSON.stringify({
        userId,
        message,
      }),
    );
  }

  public async changeNickname({ roomId, userId, nickname }: ChatUpdateNickname): Promise<void> {
    if (isNil(roomId) || isNil(userId) || isEmpty(nickname)) {
      return;
    }

    try {
      await ChatApi.updateNickname({
        roomId,
        userId,
        nickname,
      });
    } catch (error) {
      this.eventHandlers.onError(error instanceof Error ? error : new Error('닉네임 변경 중 오류가 발생했습니다.'));
    }
  }

  public async loadPreviousMessages({
    roomId,
    messageId,
  }: {
    roomId: number;
    messageId: number;
  }): Promise<ChatMessage[] | undefined> {
    if (isNil(roomId) || isNil(messageId)) {
      return;
    }

    try {
      const response = await ChatApi.loadPreviousMessages({
        roomId,
        messageId,
      });

      return response.chatMessageDto;
    } catch (error) {
      this.eventHandlers.onError(
        error instanceof Error ? error : new Error('이전 메시지 로드 중 오류가 발생했습니다.'),
      );
    }
  }

  public async getJoinedChatRooms() {
    return await ChatApi.getJoinedChatRooms();
  }
}

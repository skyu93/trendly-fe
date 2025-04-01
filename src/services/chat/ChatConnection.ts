import { Client, Message } from '@stomp/stompjs';
import { isEmpty } from 'es-toolkit/compat';
import { TokenStorage } from '@/services/tokenStorage';
import { ChatConnectionConfig, ChatConnectionEventHandlers } from './chat.type';
import { refreshAccessToken } from '@/services/httpClient';

export class ChatConnection {
  private client: Client | null = null;
  private subscription: { unsubscribe: () => void } | null = null;
  private currentRoomId: number | null = null;

  private eventHandlers: ChatConnectionEventHandlers = {
    onConnect: () => {},
    onDisconnect: () => {},
    onError: () => {},
    onMessageReceived: () => {},
  };

  private readonly config: ChatConnectionConfig;
  private readonly maxReconnectAttempts = 5; // 최대 재연결 시도 횟수
  private currentAttempts = 0;
  constructor({ brokerURL, connectHeaders = {} }: ChatConnectionConfig) {
    this.config = { brokerURL, connectHeaders };
  }

  public setEventHandlers(handlers: Partial<ChatConnectionEventHandlers>): void {
    this.eventHandlers = { ...this.eventHandlers, ...handlers };
  }

  public async connect(): Promise<void> {
    const { brokerURL, connectHeaders } = this.config;
    if (this.isConnected() || isEmpty(brokerURL)) {
      return;
    }

    if (!TokenStorage.isTokenValid()) {
      await refreshAccessToken();
    }

    this.client = new Client({
      brokerURL,
      connectHeaders,
      reconnectDelay: 5000,
      onConnect: () => {
        this.eventHandlers.onConnect();

        // 연결이 복구되었을 때 이전 채팅방 재구독
        if (this.currentRoomId) {
          this.subscribeToRoom(this.currentRoomId);
        }
      },
      onDisconnect: () => {
        this.eventHandlers.onDisconnect();
      },
      onWebSocketClose: event => {
        if (event.code === 1000) {
          // 정상 종료는 무시
          return;
        }
        this.currentAttempts++;
        if (this.currentAttempts >= this.maxReconnectAttempts) {
          this.eventHandlers.onError(
            new Error(`최대 재연결 시도 횟수(${this.maxReconnectAttempts}회)를 초과했습니다.`),
          );
          this.client?.deactivate();
        }
      },
      onStompError: frame => {
        const error = new Error(`STOMP 오류: ${frame.body}`);
        this.eventHandlers.onError(error);
      },
      onWebSocketError: () => {
        const error = new Error('WebSocket 오류가 발생했습니다.');
        this.eventHandlers.onError(error);
      },
    });
    this.client.activate();
  }

  public disconnect(): void {
    this.unsubscribe();

    if (this.isConnected()) {
      this.client?.deactivate();
    }
  }

  public reconnect(): void {
    if (this.client) {
      const wasActive = this.client.active;
      if (wasActive) {
        this.client.deactivate();
      }

      setTimeout(() => {
        this.client?.activate();
      }, 500);
    } else {
      this.connect();
    }
  }

  public isConnected(): boolean {
    return !!this.client?.active;
  }

  public subscribeToRoom(roomId: number): boolean {
    if (!this.isConnected()) {
      return false;
    }

    if (this.currentRoomId === roomId && this.subscription) {
      return true;
    }
    this.unsubscribe();

    try {
      this.subscription =
        this.client?.subscribe(`/topic/rooms/${roomId}`, message => {
          this.handleMessage(message);
        }) ?? null;

      this.currentRoomId = roomId;
      return true;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('채팅방 구독 중 오류가 발생했습니다.');
      this.eventHandlers.onError(error);
      return false;
    }
  }

  public unsubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.currentRoomId = null;
  }

  public publish(destination: string, body: string, headers: Record<string, string> = {}): boolean {
    if (!this.isConnected() || !this.client) {
      return false;
    }

    try {
      this.client.publish({
        destination,
        body,
        headers: { 'content-type': 'application/json', ...headers },
      });
      return true;
    } catch (error) {
      this.eventHandlers.onError(error instanceof Error ? error : new Error('메시지 전송 중 오류가 발생했습니다.'));
      return false;
    }
  }

  private handleMessage(message: Message): void {
    try {
      const parsedMessage = JSON.parse(message.body);
      this.eventHandlers.onMessageReceived(parsedMessage);
    } catch (e) {
      console.error('메시지 파싱 오류:', e);
    }
  }
}

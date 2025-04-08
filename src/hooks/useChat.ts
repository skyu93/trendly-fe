import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChatJoin, ChatMessage } from '@/services/chat/chat.type';
import { ChatService } from '@/services/chat/chatService';
import Api from '@/services/httpClient';
import { find, forEach, has, isEmpty, isNil, map } from 'es-toolkit/compat';
import { useUser } from '@/hooks/user/useUser';
import { isNotNil } from 'es-toolkit';
import { TokenStorage } from '@/services/tokenStorage';
import { StaticImageData } from 'next/image';
import { createWebSocketUrl, getRandomImage } from '@/lib/utils';
import { useChatStore } from '@/stores/chatStore';

let chatService: ChatService | null = null;

export const useChat = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLastMessageCalled = useRef<boolean>(false);
  const { user } = useUser();
  const {
    messages,
    currentRoomId,
    currentRoomName,
    users,
    joinedChatRooms,

    setMessages,
    addMessage,
    setCurrentRoomId,
    setCurrentRoomName,
    setUsers,
    updateUser,
    setJoinedChatRooms,
  } = useChatStore();

  const currentUserId = useMemo((): number | null => {
    if (isNil(user)) {
      return null;
    }
    return user.id;
  }, [user]);

  const currentUser = useMemo(() => {
    if (isNil(currentUserId) || isEmpty(users)) {
      return null;
    }

    return {
      userId: currentUserId,
      ...users[currentUserId],
    };
  }, [currentUserId, users]);

  const initializeService = useCallback(
    (authToken?: string) => {
      // 이미 초기화되었고 토큰이 제공되지 않았다면 아무것도 하지 않음
      if (isNotNil(chatService) || !authToken || isNil(currentUserId)) {
        return;
      }
      const { baseURL = '' } = Api.defaults;
      const brokerURL = `${createWebSocketUrl(baseURL)}/ws`;

      // 새 서비스 인스턴스 생성
      chatService = new ChatService({
        brokerURL,
        connectHeaders: {
          Authorization: authToken,
        },
      });
    },
    [currentUserId],
  );

  // 초기화 및 이벤트 핸들러 설정
  useEffect(() => {
    // 토큰이 제공되었거나 아직 초기화되지 않았다면 초기화
    const accessToken = TokenStorage.getAuthHeader();
    if (accessToken && isNil(chatService)) {
      initializeService(accessToken);
    }

    if (isNil(chatService)) {
      return;
    }

    // 이벤트 핸들러 설정
    chatService.setEventHandlers({
      onConnect: () => {
        setConnected(true);
        setError(null);
      },
      onDisconnect: () => {
        setConnected(false);
      },
      onError: err => {
        setError(err);
      },
      onEventReceived: event => {
        const { eventType, data } = event;
        if (eventType === 'NEW_MESSAGE') {
          const { userId, messageId, message, nickname } = data as ChatMessage;
          const userObj = {
            nickName: nickname ?? 'none',
            avatar: has(users, userId) ? users[userId].avatar : getRandomImage(),
          };
          setUsers({ ...users, [userId]: userObj });
          addMessage({ message, messageId, userId });
        }
      },
    });

    // 연결 시작
    chatService.connect();

    // 컴포넌트 언마운트 시 이벤트 핸들러만 제거 (연결은 유지)
    return () => {
      if (chatService) {
        chatService.setEventHandlers({
          onConnect: () => {},
          onDisconnect: () => {},
          onError: () => {},
          onEventReceived: () => {},
        });
      }
    };
  }, [initializeService, users, addMessage, setUsers]);
  // getRandomImage 제거: 외부 함수이므로 의존성에 포함되지 않아야 함

  // 방 입장 함수
  const joinRoom = useCallback(
    async ({ roomId, roomName, nickname, avatar }: ChatJoin & { roomName: string; avatar?: StaticImageData }) => {
      if (!chatService) {
        setError(new Error('채팅 서비스가 초기화되지 않았습니다.'));
        return false;
      }

      // 이전 방과 다른 경우에만 새로운 메시지 목록 시작
      if (currentRoomId !== roomId) {
        isLastMessageCalled.current = false;
        setMessages([]);
      }

      try {
        setIsLoading(true);
        const res = await chatService.joinRoom({ roomId, nickname });
        if (isNil(res)) {
          return false;
        }
        const { messages, nicknames } = res;
        setMessages([...messages]);

        const updatedUsers = { ...users };
        forEach(nicknames, (nickName, key) => {
          const userId = Number(key);
          if (!updatedUsers[userId]) {
            updatedUsers[userId] = {
              nickName,
              avatar: userId === currentUserId && avatar ? avatar : getRandomImage(),
            };
          }
        });
        setUsers(updatedUsers);
        setCurrentRoomId(roomId);
        setCurrentRoomName(roomName);
        return true;
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }

      return false;
    },
    [currentRoomId, currentUserId, setCurrentRoomId, setCurrentRoomName, setMessages, setUsers, users],
  ); // getRandomImage 제거 & users 추가

  // 메시지 전송 함수
  const sendMessage = useCallback(
    (message: string) => {
      if (!chatService || !currentRoomId || !currentUserId) {
        setError(new Error('메시지를 보낼 수 없습니다. 연결이 끊어졌습니다.'));
        return;
      }
      chatService.sendMessage({
        roomId: currentRoomId,
        userId: currentUserId,
        message,
      });
    },
    [currentRoomId, currentUserId],
  );

  // 방 나가기 함수
  const leaveRoom = useCallback(async () => {
    if (!chatService || !currentRoomId || !currentUserId) {
      return;
    }

    try {
      setIsLoading(true);
      await chatService.leaveRoom({
        roomId: currentRoomId,
        userId: currentUserId,
      });
    } catch (error) {
      setError(error as Error);
    } finally {
      setUsers({});
      setCurrentRoomId(null);
      setCurrentRoomName('');
      setMessages([]);
      setIsLoading(false);
      isLastMessageCalled.current = false;
    }
  }, [currentUserId, currentRoomId, setUsers, setCurrentRoomId, setCurrentRoomName, setMessages]);

  // 재연결 함수
  const reconnect = useCallback(() => {
    if (!chatService) {
      return;
    }
    chatService.reconnect();
  }, []);

  // 메시지 목록 초기화 함수
  const clearMessages = useCallback(() => {
    setMessages([]);
    isLastMessageCalled.current = false;
  }, [setMessages]);

  // 서비스 재설정 함수 (토큰 갱신 등에 사용)
  const resetService = useCallback(
    (newToken?: string) => {
      if (chatService) {
        chatService.disconnect();
      }
      chatService = null;
      // setMessages([]);
      // setCurrentRoomName('')
      isLastMessageCalled.current = false;
      if (newToken) {
        initializeService(newToken);
      }
    },
    [initializeService],
  );

  const changeUserNickname = useCallback(
    async (newNickName: string) => {
      if (!chatService || !currentRoomId || !currentUserId) {
        return;
      }

      try {
        setIsLoading(true);
        await chatService.changeNickname({
          roomId: currentRoomId,
          userId: currentUserId,
          nickname: newNickName,
        });
        if (currentUser) {
          const { avatar } = currentUser;
          updateUser({
            userId: currentUserId,
            nickname: newNickName,
            avatar,
          });
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [currentRoomId, currentUserId, currentUser, updateUser],
  );

  const errorMessage = useMemo(() => error?.message, [error]);

  const disconnect = useCallback(() => {
    if (chatService) {
      chatService.disconnect();
    }
  }, []);

  const loadPreviousMessages = useCallback(async () => {
    if (!chatService || !currentRoomId || isLoading || isLastMessageCalled.current) {
      return;
    }

    try {
      const [lastMessage] = messages;
      setIsLoading(true);
      const res = await chatService.loadPreviousMessages({
        roomId: currentRoomId,
        messageId: lastMessage.messageId,
      });

      if (isNil(res)) {
        return false;
      }

      const updatedUsers = { ...users };
      forEach(res.nicknames, (nickName, key) => {
        const userId = Number(key);
        if (!updatedUsers[userId]) {
          updatedUsers[userId] = {
            nickName,
            avatar: getRandomImage(),
          };
        }
      });
      setUsers(updatedUsers);

      if (!isEmpty(res.messages)) {
        setMessages([...res.messages, ...messages]);
      } else {
        isLastMessageCalled.current = true;
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [messages, currentRoomId, isLoading, setMessages, setUsers, users]);
  // setUsers와 users 추가

  const getMyChatList = useCallback(async (): Promise<void> => {
    try {
      if (!chatService) {
        return;
      }
      setIsLoading(true);
      const rooms = await chatService.getJoinedChatRooms();
      setJoinedChatRooms(rooms);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [setJoinedChatRooms]);

  const myChatRooms = useMemo((): { roomId: number; keyword: string }[] => {
    return map(joinedChatRooms, chatRoom => {
      const { roomId, keyword } = chatRoom;
      return { roomId, keyword };
    });
  }, [joinedChatRooms]);

  const isJoinedChatRoom = useCallback(
    (roomId: number): boolean => {
      return isNotNil(
        find(joinedChatRooms, chatRoom => {
          return chatRoom.roomId === roomId;
        }),
      );
    },
    [joinedChatRooms],
  );

  return {
    reconnect,
    connected,
    disconnect,
    error,
    resetService,
    isLoading,
    errorMessage,

    currentRoomName,
    currentUserId,
    currentUser,

    sendMessage,
    joinRoom,
    leaveRoom,
    changeUserNickname,
    loadPreviousMessages,
    getMyChatList,

    users,
    messages,
    myChatRooms,
    clearMessages,
    isJoinedChatRoom,
    clearError: () => {
      setError(null);
    },
  };
};

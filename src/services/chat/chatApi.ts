import Api from '@/services/httpClient';
import { API_PATH } from '@/constants/apiPath';
import { getPathParams } from '@/lib/utils';
import {
  EnterRoomResponse,
  JoinedChatRoom,
  LoadPreviousMessagesResponse,
  UpdateNicknameResponse,
} from '@/services/chat/chat.type';

export class ChatApi {
  static enter = async ({ roomId, nickname }: { roomId: number; nickname?: string }): Promise<EnterRoomResponse> => {
    const { data } = await Api.post<EnterRoomResponse>(
      getPathParams(API_PATH.CHAT_ENTER, { roomId }),
      nickname ? { nickname } : {},
    );
    return data;
  };

  static loadPreviousMessages = async ({
    roomId,
    messageId,
  }: {
    roomId: number;
    messageId: number;
  }): Promise<LoadPreviousMessagesResponse> => {
    const { data } = await Api.get<LoadPreviousMessagesResponse>(
      `${getPathParams(API_PATH.CHAT_PREVIOUS_MESSAGE, { roomId })}?messageId=${messageId}`,
    );
    return data;
  };

  static updateNickname = async ({
    roomId,
    userId,
    nickname,
  }: {
    roomId: number;
    userId: number;
    nickname: string;
  }): Promise<UpdateNicknameResponse> => {
    const { data } = await Api.patch<UpdateNicknameResponse>(getPathParams(API_PATH.CHAT_UPDATE_NICKNAME, { roomId }), {
      userId,
      nickname,
    });
    return data;
  };

  static leave = async ({ roomId, userId }: { roomId: number; userId: number }): Promise<void> => {
    await Api.patch(getPathParams(API_PATH.CHAT_LEAVE, { roomId }), { userId });
  };

  static getJoinedChatRooms = async () => {
    const { data } = await Api.get<JoinedChatRoom[]>(API_PATH.CHAT_MY_LIST);
    return data;
  };
}

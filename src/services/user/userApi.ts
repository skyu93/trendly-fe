import { API_PATH } from '@/constants/apiPath';
import { UserInfo, UserUpdateRequest } from '@/services/user/user.type';
import Api from '@/services/httpClient';

export class UserApi {
  static getUserInfo = async (): Promise<UserInfo> => {
    const { data } = await Api.get<UserInfo>(API_PATH.USER_ME);
    return data;
  };

  static updateUser = async (params: UserUpdateRequest): Promise<UserInfo> => {
    const { data } = await Api.patch<UserInfo>(API_PATH.USER_UPDATE, { ...params });
    return data;
  };

  static deleteUser = async (): Promise<{ message: string }> => {
    const { data } = await Api.patch<{ message: string }>(API_PATH.USER_DELETE);
    return data;
  };
}

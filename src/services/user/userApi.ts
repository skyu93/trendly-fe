import { API_PATH } from '@/constants/apiPath';
import { UserInfo, UserUpdateRequest } from '@/services/user/user.type';
import Api from '@/services/httpClient';

export class UserApi {
  static getUserInfo = async (): Promise<UserInfo> => {
    const { data } = await Api.get<UserInfo>(API_PATH.USER_ME);
    return data;
  };

  static updateUser = async (params: UserUpdateRequest): Promise<UserInfo> => {
    //TODO: 테스트 코드
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id: 1,
          email: 'test@trendly.com',
          birthDate: params.birthdate ?? null,
          gender: params.gender ?? null,
          marketingOpt: params.marketingOpt ?? false,
          createDate: '2025-03-06T01:09:10.2999019',
          modifiedDate: '2025-03-06T01:09:10.2999019',
        });
      }, 300);
    });
    // const { data } = await Api.patch<UserInfo>(API_PATH.USER_UPDATE, { ...params });
    // return data;
  };

  static deleteUser = async (): Promise<{ message: string }> => {
    const { data } = await Api.patch<{ message: string }>(API_PATH.USER_DELETE);
    return data;
  };
}

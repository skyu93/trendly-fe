import { UserInfo, UserUpdateRequest } from '@/services/user/user.type';
import { UserApi } from '@/services/user/userApi';
import { omitBy } from 'es-toolkit/compat';
import { TokenStorage } from '@/services/tokenStorage';

class UserService {
  constructor() {}

  public async getUserInfo(): Promise<UserInfo> {
    return await UserApi.getUserInfo();
  }

  public async update(params: UserUpdateRequest): Promise<UserInfo> {
    const isUndefinedOrEmptyString = (v?: string | boolean | null) => v === undefined || v === '';
    return await UserApi.updateUser({
      ...omitBy(params, isUndefinedOrEmptyString),
    });
  }

  public async delete(): Promise<boolean> {
    try {
      await UserApi.deleteUser();
      TokenStorage.clearToken();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;

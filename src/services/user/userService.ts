import { UserInfo, UserUpdateRequest } from '@/services/user/user.type';
import { UserApi } from '@/services/user/userApi';
import { omitBy } from 'es-toolkit/compat';

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

  public async delete(): Promise<{ message: string }> {
    return await UserApi.deleteUser();
  }
}

export default UserService;

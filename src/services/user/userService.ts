import { UserInfo, UserUpdateRequest } from '@/services/user/user.type';
import { UserApi } from '@/services/user/userApi';
import { isEmpty } from 'es-toolkit/compat';

class UserService {
  constructor() {}

  public async getUserInfo(): Promise<UserInfo> {
    return await UserApi.getUserInfo();
  }

  public async update(params: UserUpdateRequest): Promise<UserInfo> {
    const { gender, birthdate, marketingOpt } = params;
    return await UserApi.updateUser({
      gender,
      birthdate: isEmpty(birthdate) ? null : birthdate,
      marketingOpt,
    });
  }

  public async delete(params: UserUpdateRequest): Promise<UserInfo> {
    return await UserApi.updateUser(params);
  }
}

export default UserService;

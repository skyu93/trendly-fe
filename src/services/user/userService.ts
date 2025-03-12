import { UserInfo, UserUpdateRequest } from '@/services/user/user.type';
import { UserApi } from '@/services/user/userApi';
import { includes, isNil } from 'es-toolkit/compat';
import { ApiError } from '@/services/apiError';
import { ERROR_CODES } from '@/constants/errorCodes';

class UserService {
  constructor() {}
  public async update(params: UserUpdateRequest): Promise<UserInfo> {
    const { gender, birthdate } = params;
    if (!includes(['MALE', 'FEMALE'], gender) || isNil(birthdate)) {
      throw new ApiError({ code: ERROR_CODES.INVALID_FORMAT });
    }
    return await UserApi.updateUser(params);
  }

  public async delete(params: UserUpdateRequest): Promise<UserInfo> {
    return await UserApi.updateUser(params);
  }
}

export default UserService;

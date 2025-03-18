export type Gender = 'MALE' | 'FEMALE';
export interface UserInfo {
  id: number;
  email: string;
  birthDate: string | null;
  gender: Gender | null;
  marketingOpt: boolean;
  createDate: string;
  modifiedDate: string;
}

export interface UserUpdateRequest {
  gender?: Gender | null;
  birthDate?: string | null;
  marketingOpt?: boolean | null;
}

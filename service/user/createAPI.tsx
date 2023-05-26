import {
  AddUserProfileInput,
  AddUserProfileOutput,
  GetUserInfoOutput,
  UpdateUserProfileInput,
  UpdateUserProfileOutput,
  DeleteUserInfoOutput,
  GetAlarmOutput,
} from '.';
import {
  fetchAddUserProfile,
  fetchAlarm,
  fetchDeleteUserInfo,
  fetchUpdateUserProfile,
  fetchUserInfo,
} from '../../utils/axios/user';

export interface UserAPI {
  getUserInfo: () => Promise<GetUserInfoOutput>;
  updateUserProfile: (payload: UpdateUserProfileInput) => Promise<UpdateUserProfileOutput>;
  addUserProfile: (payload: AddUserProfileInput) => Promise<AddUserProfileOutput>;
  deleteUserInfo: (accessToken: string) => Promise<DeleteUserInfoOutput>;
  getAlarm: (accessToken: string) => Promise<GetAlarmOutput>;
}

const createUserAPI = (): UserAPI => {
  return {
    getUserInfo: () => fetchUserInfo(),
    updateUserProfile: (payload: UpdateUserProfileInput) => fetchUpdateUserProfile(payload),
    addUserProfile: (payload: AddUserProfileInput) => fetchAddUserProfile(payload),
    deleteUserInfo: (accessToken: string) => fetchDeleteUserInfo(accessToken),
    getAlarm: (accessToken: string) => fetchAlarm(accessToken),
  };
};

export default createUserAPI;

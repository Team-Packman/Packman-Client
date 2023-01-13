import {
  AddUserProfileInput,
  AddUserProfileOutput,
  GetUserInfoOutput,
  UpdateUserProfileInput,
  UpdateUserProfileOutput,
  DeleteUserInfoOutput,
} from '.';
import {
  fetchAddUserProfile,
  fetchDeleteUserInfo,
  fetchUpdateUserProfile,
  fetchUserInfo,
} from '../../utils/axios/user';

export interface UserAPI {
  getUserInfo: () => Promise<GetUserInfoOutput>;
  updateUserProfile: (payload: UpdateUserProfileInput) => Promise<UpdateUserProfileOutput>;
  addUserProfile: (payload: AddUserProfileInput) => Promise<AddUserProfileOutput>;
  deleteUserInfo: (accessToken: string) => Promise<DeleteUserInfoOutput>;
}

const createUserAPI = (): UserAPI => {
  return {
    getUserInfo: () => fetchUserInfo(),
    updateUserProfile: (payload: UpdateUserProfileInput) => fetchUpdateUserProfile(payload),
    addUserProfile: (payload: AddUserProfileInput) => fetchAddUserProfile(payload),
    deleteUserInfo: (accessToken: string) => fetchDeleteUserInfo(accessToken),
  };
};

export default createUserAPI;

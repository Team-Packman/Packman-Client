import { AxiosInstance } from 'axios';
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

const createUserAPI = (request: AxiosInstance): UserAPI => {
  return {
    getUserInfo: () => fetchUserInfo(request),
    updateUserProfile: (payload: UpdateUserProfileInput) =>
      fetchUpdateUserProfile(request, payload),
    addUserProfile: (payload: AddUserProfileInput) => fetchAddUserProfile(request, payload),
    deleteUserInfo: (accessToken: string) => fetchDeleteUserInfo(request, accessToken),
  };
};

export default createUserAPI;

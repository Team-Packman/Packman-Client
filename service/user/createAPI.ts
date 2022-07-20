import { AxiosInstance } from 'axios';
import {
  AddUserProfileInput,
  AddUserProfileOutput,
  GetUserInfoOutput,
  UpdateUserProfileInput,
  UpdateUserProfileOutput,
} from '.';
import withAuth from '../../utils/axios/withAuth';
import { fetchAddUserProfile, fetchUpdateUserProfile, fetchUserInfo } from '../../utils/axios/user';

export interface UserAPI {
  getUserInfo: () => Promise<GetUserInfoOutput>;
  updateUserProfile: (payload: UpdateUserProfileInput) => Promise<UpdateUserProfileOutput>;
  addUserProfile: (payload: AddUserProfileInput) => Promise<AddUserProfileOutput>;
}

export const createUserAPI = (request: AxiosInstance): UserAPI => {
  return {
    getUserInfo: () => fetchUserInfo(withAuth(request)),
    updateUserProfile: (payload: UpdateUserProfileInput) =>
      fetchUpdateUserProfile(withAuth(request), payload),
    addUserProfile: (payload: AddUserProfileInput) =>
      fetchAddUserProfile(withAuth(request), payload),
  };
};

import {
  fetchDeleteUserInfo,
  fetchUserInfo,
  fetchUpdateUserProfile,
} from '../../utils/axios/user/mock';
import { AxiosInstance } from 'axios';
import withAuth from '../../utils/axios/withAuth';
import {
  DeleteUserInfoOutput,
  GetUserInfoOutput,
  UpdateUserProfileOutput,
  UpdateUserProfileInput,
} from './index';

export interface UserAPI {
  getUserInfo: () => Promise<GetUserInfoOutput>;
  deleteUserInfo: () => Promise<DeleteUserInfoOutput>;
  updateUserProfile: (info: UpdateUserProfileInput) => Promise<UpdateUserProfileOutput>;
}

export const createUserAPI = (request: AxiosInstance): UserAPI => {
  return {
    getUserInfo: () => fetchUserInfo(withAuth(request)),
    deleteUserInfo: () => fetchDeleteUserInfo(withAuth(request)),
    updateUserProfile: (info: UpdateUserProfileInput) =>
      fetchUpdateUserProfile(withAuth(request), info),
  };
};

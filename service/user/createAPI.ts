import { AxiosInstance } from 'axios';
import { GetUserInfoOutput, UpdateUserProfileInput, UpdateUserProfileOutput } from '.';
import withAuth from '../../utils/axios/withAuth';
import { fetchUpdateUserProfile, fetchUserInfo } from '../../utils/axios/user';

export interface UserAPI {
  getUserInfo: () => Promise<GetUserInfoOutput>;
  updateUserProfile: (payload: UpdateUserProfileInput) => Promise<UpdateUserProfileOutput>;
}

export const createUserAPI = (request: AxiosInstance): UserAPI => {
  return {
    getUserInfo: () => fetchUserInfo(withAuth(request)),
    updateUserProfile: (payload: UpdateUserProfileInput) =>
      fetchUpdateUserProfile(withAuth(request), payload),
  };
};

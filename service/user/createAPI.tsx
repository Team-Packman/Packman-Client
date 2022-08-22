import { AxiosInstance } from 'axios';
import {
  AddUserProfileInput,
  AddUserProfileOutput,
  GetUserInfoOutput,
  UpdateUserProfileInput,
  UpdateUserProfileOutput,
} from '.';
import { fetchAddUserProfile, fetchUpdateUserProfile, fetchUserInfo } from '../../utils/axios/user';

export interface UserAPI {
  getUserInfo: () => Promise<GetUserInfoOutput>;
  updateUserProfile: (payload: UpdateUserProfileInput) => Promise<UpdateUserProfileOutput>;
  addUserProfile: (payload: AddUserProfileInput) => Promise<AddUserProfileOutput>;
}

const createUserAPI = (request: AxiosInstance): UserAPI => {
  const authReq = request;

  return {
    getUserInfo: () => fetchUserInfo(authReq),
    updateUserProfile: (payload: UpdateUserProfileInput) =>
      fetchUpdateUserProfile(authReq, payload),
    addUserProfile: (payload: AddUserProfileInput) => fetchAddUserProfile(request, payload),
  };
};

export default createUserAPI;

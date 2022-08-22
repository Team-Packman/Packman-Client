import { AxiosInstance } from 'axios';
import {
  AddUserProfileInput,
  AddUserProfileOutput,
  GetKakaoProfileInfoOutput,
  GetUserInfoOutput,
  UpdateUserProfileInput,
  UpdateUserProfileOutput,
} from '.';
import {
  fetchAddUserProfile,
  fetchKakaoProfileInfo,
  fetchUpdateUserProfile,
  fetchUserInfo,
} from '../../utils/axios/user';

export interface UserAPI {
  getUserInfo: () => Promise<GetUserInfoOutput>;
  updateUserProfile: (payload: UpdateUserProfileInput) => Promise<UpdateUserProfileOutput>;
  addUserProfile: (payload: AddUserProfileInput) => Promise<AddUserProfileOutput>;
  getKakaoProfileInfo: (accessToken: string) => Promise<GetKakaoProfileInfoOutput>;
}

const createUserAPI = (request: AxiosInstance): UserAPI => {
  const authReq = request;

  return {
    getUserInfo: () => fetchUserInfo(authReq),
    updateUserProfile: (payload: UpdateUserProfileInput) =>
      fetchUpdateUserProfile(authReq, payload),
    addUserProfile: (payload: AddUserProfileInput) => fetchAddUserProfile(request, payload),
    getKakaoProfileInfo: (accessToken: string) => fetchKakaoProfileInfo(accessToken),
  };
};

export default createUserAPI;

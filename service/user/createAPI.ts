import { AxiosInstance } from 'axios';
import { GetUserInfoOutput } from '.';
import withAuth from '../../utils/axios/withAuth';
import { fetchUserInfo } from '../../utils/axios/user';

export interface UserAPI {
  getUserInfo: () => Promise<GetUserInfoOutput>;
}

export const createUserAPI = (request: AxiosInstance): UserAPI => {
  return {
    getUserInfo: () => fetchUserInfo(withAuth(request)),
  };
};

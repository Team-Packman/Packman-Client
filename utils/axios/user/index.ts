import { AxiosInstance } from 'axios';
import {
  GetUserInfoOutput,
  UpdateUserProfileInput,
  UpdateUserProfileOutput,
} from '../../../service/user';

export const fetchUserInfo = async (request: AxiosInstance): Promise<GetUserInfoOutput> => {
  const { data } = await request(`/user`);
  return data;
};

export const fetchUpdateUserProfile = async (
  request: AxiosInstance,
  payload: UpdateUserProfileInput,
): Promise<UpdateUserProfileOutput> => {
  const { data } = await request.patch(`/user/profile`, payload);
  return data;
};

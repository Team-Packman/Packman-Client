import axios, { AxiosInstance } from 'axios';
import {
  AddUserProfileInput,
  AddUserProfileOutput,
  GetKakaoProfileInfoOutput,
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

export const fetchAddUserProfile = async (
  request: AxiosInstance,
  payload: AddUserProfileInput,
): Promise<AddUserProfileOutput> => {
  const { data } = await request.post(`/user/profile`, payload);
  return data;
};

export const fetchKakaoProfileInfo = async (accessToken: string) => {
  const { data }: { data: GetKakaoProfileInfoOutput } = await axios.post(
    `https://kapi.kakao.com/v2/user/me`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

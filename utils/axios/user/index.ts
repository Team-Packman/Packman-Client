import { client } from '..';
import {
  AddUserProfileInput,
  AddUserProfileOutput,
  DeleteUserInfoOutput,
  GetAlarmOutput,
  GetUserInfoOutput,
  UpdateUserProfileInput,
  UpdateUserProfileOutput,
} from '../../../service/user';

export const fetchUserInfo = async (): Promise<GetUserInfoOutput> => {
  const { data } = await client(`/user`);
  return data;
};

export const fetchUpdateUserProfile = async (
  payload: UpdateUserProfileInput,
): Promise<UpdateUserProfileOutput> => {
  const { data } = await client.patch(`/user/profile`, payload);
  return data;
};

export const fetchAddUserProfile = async (
  payload: AddUserProfileInput,
): Promise<AddUserProfileOutput> => {
  const { data } = await client.post(`/user/profile`, payload);
  return data;
};

export const fetchDeleteUserInfo = async (accessToken: string): Promise<DeleteUserInfoOutput> => {
  const { data } = await client.delete('/user', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const fetchAlarm = async (accessToken: string): Promise<GetAlarmOutput> => {
  const { data } = await client.get('/alarm', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

import { AxiosInstance } from 'axios';
import { GetUserInfoOutput } from '../../../service/user';

export const fetchUserInfo = async (request: AxiosInstance): Promise<GetUserInfoOutput> => {
  const { data } = await request(`/user`);
  return data;
};

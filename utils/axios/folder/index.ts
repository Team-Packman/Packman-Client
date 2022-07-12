import { GetFoldersOutput } from './../../../service/folder/index';
import { AxiosInstance } from 'axios';

export const fetchFolders = async (request: AxiosInstance): Promise<GetFoldersOutput> => {
  const { data } = await request(`/folder`);
  return data;
};

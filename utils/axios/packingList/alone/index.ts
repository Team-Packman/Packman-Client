import { AxiosInstance } from 'axios';
import { request } from 'http';
import { GetAloneFolderOutput } from '../../../../service/packingList/alone';

export const fetchAloneFolder = async (request: AxiosInstance): Promise<GetAloneFolderOutput> => {
  const { data } = await request(`/folder/alone`);
  return data;
};

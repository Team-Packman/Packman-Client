import { AxiosInstance } from 'axios';
import { request } from 'http';
import {
  AddAlonePackingListIntroOutput,
  AddAlonePackingListIntroInput,
  GetAloneFolderOutput,
} from '../../../../service/packingList/alone';

export const fetchAloneFolder = async (request: AxiosInstance): Promise<GetAloneFolderOutput> => {
  const { data } = await request(`/folder/alone`);
  return data;
};

export const fetchAddAlonePackingFolder = async (
  request: AxiosInstance,
  payload: AddAlonePackingListIntroInput,
): Promise<AddAlonePackingListIntroOutput> => {
  const { data } = await request.post(`/packingList/alone`, payload);
  return data;
};

import {
  DeleteAloneInventoryInput,
  DeleteAloneInventoryOutput,
} from './../../../service/inventory/alone/index';
import { AxiosInstance } from 'axios';
import { GetAloneInventoryOutput } from '../../../service/inventory/alone';

export const fetchAloneInventory = async (
  request: AxiosInstance,
  folderId: string,
): Promise<GetAloneInventoryOutput> => {
  const { data } = await request(`folder/list/alone/${folderId}`);
  return data;
};

export const fetchDeleteAloneInventory = async (
  request: AxiosInstance,
  { folderId, listId }: DeleteAloneInventoryInput,
): Promise<DeleteAloneInventoryOutput> => {
  const { data } = await request.delete(`/list/alone/${folderId}/${listId}`);
  console.log(listId);
  return data;
};

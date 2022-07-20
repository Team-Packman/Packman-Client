import { AxiosInstance } from 'axios';
import {
  DeleteAloneInventoryInput,
  DeleteAloneInventoryOutput,
  GetAloneInventoryOutput,
} from '../../../service/inventory/alone';

export const fetchAloneInventory = async (
  request: AxiosInstance,
  folderId: string,
): Promise<GetAloneInventoryOutput> => {
  const { data } = await request(`folder/packingList/alone/${folderId}`);
  return data;
};

export const fetchDeleteAloneInventory = async (
  request: AxiosInstance,
  { folderId, listId }: DeleteAloneInventoryInput,
): Promise<DeleteAloneInventoryOutput> => {
  const { data } = await request.delete(`/packingList/alone/${folderId}/${listId}`);
  return data;
};

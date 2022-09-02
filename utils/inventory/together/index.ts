import { AxiosInstance } from 'axios';
import {
  DeleteTogetherInventoryInput,
  DeleteTogetherInventoryOutput,
  GetTogetherInventoryOutput,
} from '../../../service/inventory/together';

export const fetchTogetherInventory = async (
  request: AxiosInstance,
  folderId: string,
): Promise<GetTogetherInventoryOutput> => {
  const { data } = await request(`folder/list/together/${folderId}`);
  return data;
};

export const fetchDeleteTogetherInventory = async (
  request: AxiosInstance,
  { folderId, listId }: DeleteTogetherInventoryInput,
): Promise<DeleteTogetherInventoryOutput> => {
  const { data } = await request.delete(`/list/together/${folderId}/${listId}`);
  return data;
};

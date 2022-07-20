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
  const { data } = await request(`folder/packingList/together/${folderId}`);
  return data;
};

export const fetchDeleteTogetherInventory = async (
  request: AxiosInstance,
  { folderId, listId }: DeleteTogetherInventoryInput,
): Promise<DeleteTogetherInventoryOutput> => {
  const { data } = await request.delete(`/packingList/together/${folderId}/${listId}`);
  return data;
};

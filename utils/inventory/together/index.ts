import {
  DeleteTogetherInventoryInput,
  DeleteTogetherInventoryOutput,
  GetTogetherInventoryOutput,
} from '../../../service/inventory/together';
import { client } from '../../axios';

export const fetchTogetherInventory = async (
  folderId: string,
): Promise<GetTogetherInventoryOutput> => {
  const { data } = await client(`folder/list/together/${folderId}`);
  return data;
};

export const fetchDeleteTogetherInventory = async ({
  folderId,
  listId,
}: DeleteTogetherInventoryInput): Promise<DeleteTogetherInventoryOutput> => {
  const { data } = await client.delete(`/list/together/${folderId}/${listId}`);
  return data;
};

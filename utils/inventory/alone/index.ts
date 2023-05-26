import {
  DeleteAloneInventoryInput,
  DeleteAloneInventoryOutput,
} from './../../../service/inventory/alone/index';
import { GetAloneInventoryOutput } from '../../../service/inventory/alone';
import { client } from '../../axios';

export const fetchAloneInventory = async (folderId: string): Promise<GetAloneInventoryOutput> => {
  const { data } = await client(`folder/list/alone/${folderId}`);
  return data;
};

export const fetchDeleteAloneInventory = async ({
  folderId,
  listId,
}: DeleteAloneInventoryInput): Promise<DeleteAloneInventoryOutput> => {
  const { data } = await client.delete(`/list/alone/${folderId}/${listId}`);
  return data;
};

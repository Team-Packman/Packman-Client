import { AxiosInstance } from 'axios';
import { GetAloneInventoryOutput } from '../../../service/inventory/alone';

export const fetchAloneInventory = async (
  request: AxiosInstance,
  folderId: string,
): Promise<GetAloneInventoryOutput> => {
  const { data } = await request(`folder/packingList/alone/${folderId}`);
  return data;
};

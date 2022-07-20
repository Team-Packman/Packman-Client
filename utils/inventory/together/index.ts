import { AxiosInstance } from 'axios';
import { GetTogetherInventoryOutput } from '../../../service/inventory/together';

export const fetchTogetherInventory = async (
  request: AxiosInstance,
  folderId: string,
): Promise<GetTogetherInventoryOutput> => {
  const { data } = await request(`folder/packingList/together/${folderId}`);
  return data;
};

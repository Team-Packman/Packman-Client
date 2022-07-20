import { AxiosInstance } from 'axios';
import { GetAloneInventoryOutput } from '.';
import withAuth from '../../../utils/axios/withAuth';
import { fetchAloneInventory } from '../../../utils/inventory/alone';

export interface AloneAPI {
  alone: {
    getAloneInventory: (folderId: string) => Promise<GetAloneInventoryOutput>;
  };
}

export const createAloneAPI = (request: AxiosInstance): AloneAPI => {
  return {
    alone: {
      getAloneInventory: (folderId: string) => fetchAloneInventory(withAuth(request), folderId),
    },
  };
};

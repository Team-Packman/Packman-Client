import { AxiosInstance } from 'axios';
import { GetAloneInventoryOutput } from '.';
import withAuth from '../../../utils/axios/withAuth';
import { fetchAloneInventory } from '../../../utils/inventory/alone';

export interface AloneAPI {
  together: {
    getAloneInventory: (folderId: string) => Promise<GetAloneInventoryOutput>;
  };
}

export const createTogetherAPI = (request: AxiosInstance): AloneAPI => {
  return {
    together: {
      getAloneInventory: (folderId: string) => fetchAloneInventory(withAuth(request), folderId),
    },
  };
};

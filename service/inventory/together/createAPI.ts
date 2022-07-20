import { AxiosInstance } from 'axios';
import { GetTogetherInventoryOutput } from '.';
import withAuth from '../../../utils/axios/withAuth';
import { fetchTogetherInventory } from '../../../utils/inventory/together';

export interface TogetherAPI {
  together: {
    getTogetherInventory: (folderId: string) => Promise<GetTogetherInventoryOutput>;
  };
}

export const createTogetherAPI = (request: AxiosInstance): TogetherAPI => {
  return {
    together: {
      getTogetherInventory: (folderId: string) =>
        fetchTogetherInventory(withAuth(request), folderId),
    },
  };
};

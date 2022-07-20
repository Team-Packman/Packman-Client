import { AxiosInstance } from 'axios';
import {
  DeleteTogetherInventoryInput,
  DeleteTogetherInventoryOutput,
  GetTogetherInventoryOutput,
} from '.';
import withAuth from '../../../utils/axios/withAuth';
import {
  fetchDeleteTogetherInventory,
  fetchTogetherInventory,
} from '../../../utils/inventory/together';

export interface TogetherAPI {
  together: {
    getTogetherInventory: (folderId: string) => Promise<GetTogetherInventoryOutput>;
    deleteTogetherInventory: (
      params: DeleteTogetherInventoryInput,
    ) => Promise<DeleteTogetherInventoryOutput>;
  };
}

export const createTogetherAPI = (request: AxiosInstance): TogetherAPI => {
  return {
    together: {
      getTogetherInventory: (folderId: string) =>
        fetchTogetherInventory(withAuth(request), folderId),
      deleteTogetherInventory: (params: DeleteTogetherInventoryInput) =>
        fetchDeleteTogetherInventory(withAuth(request), params),
    },
  };
};

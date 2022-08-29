import { AxiosInstance } from 'axios';
import {
  DeleteTogetherInventoryInput,
  DeleteTogetherInventoryOutput,
  GetTogetherInventoryOutput,
} from '.';
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

const createTogetherAPI = (request: AxiosInstance): TogetherAPI => {
  const authReq = request;
  return {
    together: {
      getTogetherInventory: (folderId: string) => fetchTogetherInventory(authReq, folderId),
      deleteTogetherInventory: (params: DeleteTogetherInventoryInput) =>
        fetchDeleteTogetherInventory(authReq, params),
    },
  };
};

export default createTogetherAPI;

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
import { DeleteAloneInventoryInput } from '../alone';

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

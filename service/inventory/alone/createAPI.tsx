import { AxiosInstance } from 'axios';
import { DeleteAloneInventoryInput, DeleteAloneInventoryOutput, GetAloneInventoryOutput } from '.';
import withAuth from '../../../utils/axios/withAuth';
import { fetchAloneInventory, fetchDeleteAloneInventory } from '../../../utils/inventory/alone';

export interface AloneAPI {
  alone: {
    getAloneInventory: (folderId: string) => Promise<GetAloneInventoryOutput>;
    deleteAloneInventory: (
      params: DeleteAloneInventoryInput,
    ) => Promise<DeleteAloneInventoryOutput>;
  };
}

const createAloneAPI = (request: AxiosInstance): AloneAPI => {
  const authReq = request;
  return {
    alone: {
      getAloneInventory: (folderId: string) => fetchAloneInventory(authReq, folderId),
      deleteAloneInventory: (params: DeleteAloneInventoryInput) =>
        fetchDeleteAloneInventory(authReq, params),
    },
  };
};

export default createAloneAPI;

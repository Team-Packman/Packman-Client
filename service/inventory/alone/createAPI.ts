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

export const createAloneAPI = (request: AxiosInstance): AloneAPI => {
  return {
    alone: {
      getAloneInventory: (folderId: string) => fetchAloneInventory(withAuth(request), folderId),
      deleteAloneInventory: (params: DeleteAloneInventoryInput) =>
        fetchDeleteAloneInventory(withAuth(request), params),
    },
  };
};

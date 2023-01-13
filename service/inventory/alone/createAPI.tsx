import { DeleteAloneInventoryInput, DeleteAloneInventoryOutput, GetAloneInventoryOutput } from '.';
import { fetchAloneInventory, fetchDeleteAloneInventory } from '../../../utils/inventory/alone';

export interface AloneAPI {
  alone: {
    getAloneInventory: (folderId: string) => Promise<GetAloneInventoryOutput>;
    deleteAloneInventory: (
      params: DeleteAloneInventoryInput,
    ) => Promise<DeleteAloneInventoryOutput>;
  };
}

const createAloneAPI = (): AloneAPI => {
  return {
    alone: {
      getAloneInventory: (folderId: string) => fetchAloneInventory(folderId),
      deleteAloneInventory: (params: DeleteAloneInventoryInput) =>
        fetchDeleteAloneInventory(params),
    },
  };
};

export default createAloneAPI;

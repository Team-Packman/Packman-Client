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

const createTogetherAPI = (): TogetherAPI => {
  return {
    together: {
      getTogetherInventory: (folderId: string) => fetchTogetherInventory(folderId),
      deleteTogetherInventory: (params: DeleteTogetherInventoryInput) =>
        fetchDeleteTogetherInventory(params),
    },
  };
};

export default createTogetherAPI;

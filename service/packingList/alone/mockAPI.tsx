import { fetchPackingListWithFolders } from '../../../utils/axios/packingList/alone/mock';
import {
  AddAlonePackingListIntroOutput,
  AddAlonePackingListIntroInput,
  GetAloneFolderOutput,
  GetPackingListWithFoldersOutput,
} from './index';
import {
  fetchAddAlonePackingFolder,
  fetchAloneFolder,
} from '../../../utils/axios/packingList/alone';

export interface AloneAPI {
  alone: {
    getPackingListWithFolders: () => Promise<GetPackingListWithFoldersOutput>;
    // 연결한 api
    getAloneFolder: () => Promise<GetAloneFolderOutput>;
    addAlonePackingListFolder: (
      payload: AddAlonePackingListIntroInput,
    ) => Promise<AddAlonePackingListIntroOutput>;
  };
}

export const createAloneAPI = (): AloneAPI => {
  return {
    alone: {
      getPackingListWithFolders: () => fetchPackingListWithFolders(),
      // 연결한 api
      getAloneFolder: () => fetchAloneFolder(),
      addAlonePackingListFolder: (payload: AddAlonePackingListIntroInput) =>
        fetchAddAlonePackingFolder(payload),
    },
  };
};

import {
  fetchPackingListIntro,
  fetchPackingListWithFolders,
} from '../../../utils/axios/packingList/alone/mock';
import {
  AddAlonePackingListIntroOutput,
  AddAlonePackingListIntroInput,
  GetAloneFolderOutput,
  GetPackingListWithFoldersOutput,
} from './index';
import { AxiosInstance } from 'axios';
import withAuth from '../../../utils/axios/withAuth';
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

export const createAloneAPI = (request: AxiosInstance): AloneAPI => {
  return {
    alone: {
      getPackingListWithFolders: () => fetchPackingListWithFolders(request),
      // 연결한 api
      getAloneFolder: () => fetchAloneFolder(request),
      addAlonePackingListFolder: (payload: AddAlonePackingListIntroInput) =>
        fetchAddAlonePackingFolder(request, payload),
    },
  };
};

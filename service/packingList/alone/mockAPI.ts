import {
  fetchPackingListIntro,
  fetchPackingListWithFolders,
} from './../../../utils/axios/packingList/alone/mock';
import {
  AddPackingListIntroOutput,
  AddPakingListIntroInput,
  GetAloneFolderOutput,
  GetPackingListWithFoldersOutput,
} from './index';
import { AxiosInstance } from 'axios';
import withAuth from '../../../utils/axios/withAuth';
import { fetchAloneFolder } from '../../../utils/axios/packingList/alone';

export interface AloneAPI {
  alone: {
    getPackingListWithFolders: () => Promise<GetPackingListWithFoldersOutput>;
    addIntroFolder: (info: AddPakingListIntroInput) => Promise<AddPackingListIntroOutput>;
    // 연결한 api
    getAloneFolder: () => Promise<GetAloneFolderOutput>;
  };
}

export const createAloneAPI = (request: AxiosInstance): AloneAPI => {
  return {
    alone: {
      getPackingListWithFolders: () => fetchPackingListWithFolders(withAuth(request)),
      addIntroFolder: (info: AddPakingListIntroInput) =>
        fetchPackingListIntro(withAuth(request), info),
      // 연결한 api
      getAloneFolder: () => fetchAloneFolder(withAuth(request)),
    },
  };
};

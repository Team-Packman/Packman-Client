import {
  fetchPackingListIntro,
  fetchPackingListWithFolders,
} from './../../../utils/axios/packingList/alone/mock';
import {
  AddPackingListIntroOutput,
  AddPakingListIntroInput,
  GetPackingListWithFoldersOutput,
} from './index';
import { AxiosInstance } from 'axios';
import withAuth from '../../../utils/axios/withAuth';

export interface AloneAPI {
  alone: {
    getPackingListWithFolders: () => Promise<GetPackingListWithFoldersOutput>;
    addIntroFolder: (info: AddPakingListIntroInput) => Promise<AddPackingListIntroOutput>;
  };
}

export const createAloneAPI = (request: AxiosInstance): AloneAPI => {
  return {
    alone: {
      getPackingListWithFolders: () => fetchPackingListWithFolders(withAuth(request)),
      addIntroFolder: (info: AddPakingListIntroInput) =>
        fetchPackingListIntro(withAuth(request), info),
    },
  };
};

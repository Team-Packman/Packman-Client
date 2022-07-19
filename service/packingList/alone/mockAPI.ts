import {
  fetchPackingListDetail,
  fetchPackingListWithFolders,
} from './../../../utils/axios/packingList/alone/mock';
import { GetAlonePackingListDetailOutput, GetPackingListWithFoldersOutput } from './index';
import { AxiosInstance } from 'axios';
import withAuth from '../../../utils/axios/withAuth';

export interface AloneAPI {
  alone: {
    getPackingListWithFolders: () => Promise<GetPackingListWithFoldersOutput>;
    getPackingListDeatil: (listId: string) => Promise<GetAlonePackingListDetailOutput>;
  };
}

export const createAloneAPI = (request: AxiosInstance): AloneAPI => {
  return {
    alone: {
      getPackingListWithFolders: () => fetchPackingListWithFolders(withAuth(request)),
      getPackingListDeatil: (listId: string) => fetchPackingListDetail(withAuth(request), listId),
    },
  };
};

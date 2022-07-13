import { fetchPackingListWithFolders } from './../../../utils/axios/packingList/alone/mock';
import { GetPackingListWithFoldersOutput } from './index';
import { AxiosInstance } from 'axios';
import withAuth from '../../../utils/axios/withAuth';

export interface AloneAPI {
  alone: { getPackingListWithFolders: () => Promise<GetPackingListWithFoldersOutput> };
}

export const createAloneAPI = (request: AxiosInstance): AloneAPI => {
  return {
    alone: { getPackingListWithFolders: () => fetchPackingListWithFolders(withAuth(request)) },
  };
};

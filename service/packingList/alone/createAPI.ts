import { AxiosInstance } from 'axios';
import {
  AddAlonePackingListIntroOutput,
  AddAlonePackingListIntroInput,
  GetAloneFolderOutput,
} from './index';
import {
  fetchAddAlonePackingFolder,
  fetchAloneFolder,
} from '../../../utils/axios/packingList/alone';
import withAuth from '../../../utils/axios/withAuth';

export interface AloneAPI {
  alone: {
    getAloneFolder: () => Promise<GetAloneFolderOutput>;
    addAlonePackingListFolder: (
      payload: AddAlonePackingListIntroInput,
    ) => Promise<AddAlonePackingListIntroOutput>;
  };
}

export const createAloneAPI = (request: AxiosInstance): AloneAPI => {
  return {
    alone: {
      getAloneFolder: () => fetchAloneFolder(withAuth(request)),
      addAlonePackingListFolder: (payload: AddAlonePackingListIntroInput) =>
        fetchAddAlonePackingFolder(withAuth(request), payload),
    },
  };
};

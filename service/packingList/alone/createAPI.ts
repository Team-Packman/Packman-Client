import { AxiosInstance } from 'axios';
import { GetAloneFolderOutput } from '.';
import { fetchAloneFolder } from '../../../utils/axios/packingList/alone';
import withAuth from '../../../utils/axios/withAuth';

export interface AloneAPI {
  alone: {
    getAloneFolder: () => Promise<GetAloneFolderOutput>;
  };
}

export const createAloneAPI = (request: AxiosInstance): AloneAPI => {
  return {
    alone: {
      getAloneFolder: () => fetchAloneFolder(withAuth(request)),
    },
  };
};

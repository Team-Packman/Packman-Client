import { fetchHelp } from './../../../utils/axios/packingList/common/index';
import {
  GetSharedPackingListDetailOutput,
  GetSharedPackingListDetailInput,
  GetHelp,
} from './index';
import { AxiosInstance } from 'axios';
import { fetchSharedPackingListDetail } from '../../../utils/axios/packingList/common';

export interface CommonListAPI {
  common: {
    getSharedPackingListDetail: (
      payload: GetSharedPackingListDetailInput,
    ) => Promise<GetSharedPackingListDetailOutput>;
    getHelp: () => Promise<GetHelp>;
  };
}

const createCommonListAPI = (): CommonListAPI => {
  return {
    common: {
      getSharedPackingListDetail: (payload: GetSharedPackingListDetailInput) =>
        fetchSharedPackingListDetail(payload),
      getHelp: () => fetchHelp(),
    },
  };
};

export default createCommonListAPI;

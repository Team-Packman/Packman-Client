import { GetSharedPackingListDetailOutput, GetSharedPackingListDetailInput } from './index';
import { AxiosInstance } from 'axios';
import { fetchSharedPackingListDetail } from '../../../utils/axios/packingList/common';

export interface CommonListAPI {
  common: {
    getSharedPackingListDetail: (
      payload: GetSharedPackingListDetailInput,
    ) => Promise<GetSharedPackingListDetailOutput>;
  };
}

const createCommonListAPI = (request: AxiosInstance): CommonListAPI => {
  return {
    common: {
      getSharedPackingListDetail: (payload: GetSharedPackingListDetailInput) =>
        fetchSharedPackingListDetail(request, payload),
    },
  };
};

export default createCommonListAPI;

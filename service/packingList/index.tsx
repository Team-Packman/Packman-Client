import { AxiosInstance } from 'axios';
import createTogetherAPI, { TogetherAPI } from './together/createAPI';
import createAloneAPI, { AloneAPI } from './alone/createAPI';
import createCommonListAPI, { CommonListAPI } from './common/createAPI';

export type PackingListAPI = AloneAPI & TogetherAPI & CommonListAPI;

const createPackingListAPI = (request: AxiosInstance): PackingListAPI => {
  return Object.assign(
    {},
    createAloneAPI(request),
    createTogetherAPI(request),
    createCommonListAPI(request),
  );
};

export default createPackingListAPI;

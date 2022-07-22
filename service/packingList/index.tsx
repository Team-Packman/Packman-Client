import { AxiosInstance } from 'axios';
import createTogetherAPI, { TogetherAPI } from './together/createAPI';
import createAloneAPI, { AloneAPI } from './alone/createAPI';

export type PackingListAPI = AloneAPI & TogetherAPI;

const createPackingListAPI = (request: AxiosInstance): PackingListAPI => {
  return Object.assign({}, createAloneAPI(request), createTogetherAPI(request));
};

export default createPackingListAPI;

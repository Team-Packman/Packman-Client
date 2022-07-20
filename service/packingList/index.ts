import { AxiosInstance } from 'axios';
import { TogetherAPI, createTogetherAPI } from './together/createAPI';
import { AloneAPI, createAloneAPI } from './alone/mockAPI';

export type PackingListAPI = AloneAPI & TogetherAPI;

export const createPackingListAPI = (request: AxiosInstance): PackingListAPI => {
  return Object.assign({}, createAloneAPI(request), createTogetherAPI(request));
};

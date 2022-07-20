import { AxiosInstance } from 'axios';
import { AloneAPI, createAloneAPI } from './alone/createAPI';
import { createTogetherAPI, TogetherAPI } from './together/createAPI';

export type InventoryAPI = TogetherAPI & AloneAPI;

export const createInventoryAPI = (request: AxiosInstance): InventoryAPI => {
  return Object.assign({}, createAloneAPI(request), createTogetherAPI(request));
};

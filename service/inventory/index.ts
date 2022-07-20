import { AxiosInstance } from 'axios';
import { TogetherAPI, createTogetherAPI } from './together/createAPI';
// import { AloneAPI, createAloneAPI } from './alone/mockAPI';

export type InventoryAPI = TogetherAPI;

export const createInventoryAPI = (request: AxiosInstance): InventoryAPI => {
  return Object.assign({}, createTogetherAPI(request));
};

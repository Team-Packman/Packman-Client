import { AxiosInstance } from 'axios';
import createAloneAPI, { AloneAPI } from './alone/createAPI';
import createTogetherAPI, { TogetherAPI } from './together/createAPI';

export type InventoryAPI = TogetherAPI & AloneAPI;

const createInventoryAPI = (request: AxiosInstance): InventoryAPI => {
  return Object.assign({}, createAloneAPI(request), createTogetherAPI(request));
};

export default createInventoryAPI;

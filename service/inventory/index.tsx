import createAloneAPI, { AloneAPI } from './alone/createAPI';
import createTogetherAPI, { TogetherAPI } from './together/createAPI';

export type InventoryAPI = TogetherAPI & AloneAPI;

const createInventoryAPI = (): InventoryAPI => {
  return Object.assign({}, createAloneAPI(), createTogetherAPI());
};

export default createInventoryAPI;

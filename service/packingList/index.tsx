import createTogetherAPI, { TogetherAPI } from './together/createAPI';
import createAloneAPI, { AloneAPI } from './alone/createAPI';
import createCommonListAPI, { CommonListAPI } from './common/createAPI';

export type PackingListAPI = AloneAPI & TogetherAPI & CommonListAPI;

const createPackingListAPI = (): PackingListAPI => {
  return Object.assign({}, createAloneAPI(), createTogetherAPI(), createCommonListAPI());
};

export default createPackingListAPI;

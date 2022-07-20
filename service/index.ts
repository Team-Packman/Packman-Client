import { PackingListAPI, createPackingListAPI } from './packingList/index';
import { AxiosInstance } from 'axios';
import { AXIOS_KEY } from '../utils/axios/axios';
import { createFolderAPI, FolderAPI } from './folder/mockAPI';
import { createEctAPI, EctAPI } from './ect/createAPI';
import { createInventoryAPI, InventoryAPI } from './inventory';
import { createUserAPI, UserAPI } from './user/createAPI';
export interface APIService {
  folder: FolderAPI;
  packingList: PackingListAPI;
  inventory: InventoryAPI;
  user: UserAPI;
  ect: EctAPI;
}
type Config = {
  [key in AXIOS_KEY]: AxiosInstance;
};

export function createAPIService(config: Config): APIService {
  const { axiosWithAuth } = config;
  const folder = createFolderAPI(axiosWithAuth);
  const packingList = createPackingListAPI(axiosWithAuth);
  const user = createUserAPI(axiosWithAuth);
  const ect = createEctAPI(axiosWithAuth);
  const inventory = createInventoryAPI(axiosWithAuth);
  return {
    folder,
    packingList,
    user,
    ect,
    inventory,
  };
}

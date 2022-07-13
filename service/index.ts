import { PackingListAPI, createPackingListAPI } from './packingList/index';
import { AxiosInstance } from 'axios';
import { AXIOS_KEY } from '../utils/axios/axios';
import { createFolderAPI, FolderAPI } from './folder/mockAPI';
import { createUserAPI, UserAPI } from './user/mockAPI';
export interface APIService {
  folder: FolderAPI;
  packingList: PackingListAPI;
  user: UserAPI;
}
type Config = {
  [key in AXIOS_KEY]: AxiosInstance;
};

export function createAPIService(config: Config): APIService {
  const { axiosWithAuth } = config;
  const folder = createFolderAPI(axiosWithAuth);
  const packingList = createPackingListAPI(axiosWithAuth);
  const user = createUserAPI(axiosWithAuth);
  return {
    folder,
    packingList,
    user,
  };
}

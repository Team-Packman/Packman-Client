import { AxiosInstance } from 'axios';
import { AXIOS_KEY } from '../utils/axios/axios';
import { TogetherAPI, createTogetherAPI } from './together/mockAPI';
import { createFolderAPI, FolderAPI } from './folder/mockAPI';
export interface APIService {
  together: TogetherAPI;
  folder: FolderAPI;
}
type Config = {
  [key in AXIOS_KEY]: AxiosInstance;
};

export function createAPIService(config: Config): APIService {
  const { axiosWithAuth } = config;
  const together = createTogetherAPI(axiosWithAuth);
  const folder = createFolderAPI(axiosWithAuth);
  return {
    together,
    folder,
  };
}

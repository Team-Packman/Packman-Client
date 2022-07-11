import { TogetherAPI, createTogetherAPI } from './together/createAPI';
import { AxiosInstance } from 'axios';
import { AXIOS_KEY } from '../utils/axios/axios';

type SERVICE_KEY = keyof APIService;
type API = APIService[SERVICE_KEY];
type API_KEY = keyof API;
export type METHOD = API[API_KEY];

export interface APIService {
  together: TogetherAPI;
}
type Config = {
  [key in AXIOS_KEY]: AxiosInstance;
};

export function createAPIService(config: Config): APIService {
  const { axiosWithAuth } = config;
  const together = createTogetherAPI(axiosWithAuth);
  return {
    together,
  };
}

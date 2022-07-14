import { AxiosInstance } from 'axios';
import { createTogetherAPI } from '../together/mockAPI';
import { TogetherAPI } from './../together/mockAPI';
import { AloneAPI, createAloneAPI } from './alone/mockAPI';

export type PackingListAPI = AloneAPI & TogetherAPI;

export const createPackingListAPI = (request: AxiosInstance): PackingListAPI => {
  return Object.assign({}, createAloneAPI(request), createTogetherAPI(request));
};

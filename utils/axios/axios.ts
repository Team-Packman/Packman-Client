import axios, { AxiosInstance } from 'axios';

enum AXIOS_KEY {
  axiosBasic = 'axiosBasic',
  axiosWithAuth = 'axiosWithAuth',
}

export type Config = {
  [key in AXIOS_KEY]: AxiosInstance;
};

export default function createAxios(endpoint: string) {
  const axiosBasic = axios.create({
    baseURL: endpoint,
    headers: { 'Content-Type': 'application/json' },
  });

  const axiosWithAuth = axios.create({
    baseURL: endpoint,
    headers: { 'Content-Type': 'application/json' },
  });

  return {
    axiosBasic,
    axiosWithAuth,
  };
}

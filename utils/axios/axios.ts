import axios from 'axios';

export enum AXIOS_KEY {
  axiosBasic = 'axiosBasic',
  axiosWithAuth = 'axiosWithAuth',
}

export default function createAxios(endpoint: string) {
  const axiosBasic = axios.create({
    baseURL: endpoint,
    headers: { 'Content-Type': 'application/json' },
  });

  const axiosWithAuth = axios.create({
    baseURL: endpoint,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  return {
    axiosBasic,
    axiosWithAuth,
  };
}

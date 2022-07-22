import axios from 'axios';

export enum AXIOS_KEY {
  axiosBasic = 'axiosBasic',
  axiosWithAuth = 'axiosWithAuth',
  axiosWithToken = 'axiosWithToken',
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

  const axiosWithToken = (token: string) =>
    axios.create({
      baseURL: endpoint,
      headers: { 'Content-Type': 'application/json', ['Authorization']: token },
      withCredentials: true,
    });

  return {
    axiosBasic,
    axiosWithAuth,
    axiosWithToken,
  };
}

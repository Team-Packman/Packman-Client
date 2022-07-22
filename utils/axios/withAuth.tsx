import { useEffect, useState } from 'react';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { User } from '../../type/globalState';
import useGlobalSelector from '../hooks/useGlobalSelector';

function withAuth(axios: AxiosInstance, user: User | null) {
  if (user) {
    const requestIntercept = axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (config.headers && !config.headers['Authorization']) {
          config.headers['Authorization'] = `${user.accessToken}`;
          return config;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }
  return axios;
}

export default withAuth;

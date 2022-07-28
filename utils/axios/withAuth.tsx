import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { User } from '../recoil/atom';
import { authedUser } from '../recoil/atom/atom';

function withAuth(axios: AxiosInstance, user: User) {
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
  return axios;
}

export default withAuth;

import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { User } from '../recoil/atom';
import { authedUser } from '../recoil/atom/atom';

function withAuth(axios: AxiosInstance, user: User) {
  const router = useRouter();
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

  const responseIntercept = axios.interceptors.response.use(
    (config: AxiosRequestConfig) => {
      return config;
    },
    (error) => {
      if (error.response.status === 401) {
        router.replace('/login');
      }
    },
  );
  return axios;
}

export default withAuth;

import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { User } from '../recoil/atom';
import { authedUser } from '../recoil/atom/atom';

function withAuth(axios: AxiosInstance, user: User) {
  const requestIntercept = axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers && !config.headers['Authorization']) {
        // config.headers['Authorization'] = `${user.accessToken}`;
        config.headers[
          'Authorization'
        ] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMzRlN2U1ZDI1Mzc4NTQ4MmRjYTQ1In0sImlhdCI6MTY2MDExMjgwNiwiZXhwIjoxNjYxODQwODA2fQ.hv1BG1BNbXM9dlxN_hD__s3YIuj1mxd4ET5wKq-ptSE`;
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

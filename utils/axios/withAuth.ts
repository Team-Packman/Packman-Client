import { AxiosInstance, AxiosRequestConfig } from 'axios';

function withAuth(axios: AxiosInstance) {
  const accessToken = 'token';

  const requestIntercept = axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers && !config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
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

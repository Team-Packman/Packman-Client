import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useRecoilValue } from 'recoil';
import { useRefresh } from '../hooks/queries/auth/auth';
import { authUserAtom } from '../recoil/atom/atom';

function withAuth(axiosWithAuth: AxiosInstance) {
  const tokens = useRecoilValue(authUserAtom);
  const refresh = useRefresh(tokens);

  const requestIntercept = axiosWithAuth.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers && !config.headers['Authorization']) {
        config.headers['Authorization'] = `${tokens.accessToken}`;

        return config;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  const responseIntercept = axiosWithAuth.interceptors.response.use(
    (config: AxiosRequestConfig) => config,
    async (error) => {
      const config = error.config;
      alert('ac' + JSON.stringify(error) + '//' + localStorage.getItem('recoil-persist'));
      if (error.response.status === 401) {
        const tokens = await refresh();

        if (tokens) {
          config.headers['Authorization'] = `${tokens.accessToken}`;

          return axiosWithAuth(config);
        }
      }

      return Promise.reject(error);
    },
  );
  return axiosWithAuth;
}

export default withAuth;

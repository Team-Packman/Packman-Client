import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import useAPI from '../hooks/useAPI';
import { authUserAtom } from '../recoil/atom/atom';

function withAuth(axiosWithAuth: AxiosInstance) {
  // const router = useRouter();
  const { accessToken, refreshToken } = useRecoilValue(authUserAtom);
  const refresh = useAPI((api) => api.auth.refresh);

  const requestIntercept = axiosWithAuth.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers && !config.headers['Authorization']) {
        config.headers['Authorization'] = `${accessToken}`;
        return config;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const responseIntercept = axiosWithAuth.interceptors.response.use(
    (config: AxiosRequestConfig) => {
      return config;
    },
    async (error) => {
      if (error.response.status === 401) {
        // console.log('401!');
        // const prev = error.config;
        // const { data } = await refresh(accessToken, refreshToken);
        // console.log('', data);
        // router.replace('/login');
      }
    },
  );
  return axiosWithAuth;
}

export default withAuth;

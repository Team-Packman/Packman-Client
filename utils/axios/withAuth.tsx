import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { useRefresh } from '../hooks/queries/auth/auth';
import { authUserAtom } from '../recoil/atom/atom';

function withAuth(axiosWithAuth: AxiosInstance) {
  const router = useRouter();
  const { accessToken, refreshToken } = useRecoilValue(authUserAtom);
  const refresh = useRefresh({ accessToken, refreshToken });

  const requestIntercept = axiosWithAuth.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers && !config.headers['Authorization']) {
        config.headers['Authorization'] = `${accessToken}`;

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

      if (error.response.status === 401) {
        if (!config.headers['Authorization']) {
          alert('로그인 후 이용해 주세요');
          router.replace('/login');
        } else {
          const tokens = await refresh();

          if (tokens) {
            config.headers['Authorization'] = `${tokens.accessToken}`;

            return axiosWithAuth(config);
          }
        }
      }

      return Promise.reject(error);
    },
  );
  return axiosWithAuth;
}

export default withAuth;

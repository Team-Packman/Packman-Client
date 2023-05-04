import { useRefresh } from '../hooks/queries/auth/auth';
import { authUserAtom } from '../recoil/atom/atom';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { PropsWithChildren, useEffect } from 'react';
import cookie from 'react-cookies';
import { setTokens } from '../cookies';

enum AXIOS_KEY {
  axiosBasic = 'axiosBasic',
  client = 'client',
}

export type Config = {
  [key in AXIOS_KEY]: AxiosInstance;
};

const BASE_URL = process.env.NEXT_PUBLIC_END ?? '';

export default function createAxios(endpoint: string, config?: AxiosRequestConfig) {
  const axiosBasic = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json', ...config?.headers },
    ...config,
  });

  const client = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json', ...config?.headers },
    ...config,
  });

  return {
    axiosBasic,
    client,
  };
}

function AxiosInterceptor({ children }: PropsWithChildren) {
  const router = useRouter();
  const { accessToken, refreshToken } = useRecoilValue(authUserAtom);
  const refresh = useRefresh({ accessToken, refreshToken });

  const requestIntercept = client.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers && !config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;

        return config;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  const responseIntercept = client.interceptors.response.use(
    (config: AxiosRequestConfig) => config,
    async (error) => {
      const config = error.config;

      if (error.response?.status === 401) {
        if (!config.headers['Authorization']) {
          alert('로그인 후 이용해 주세요');
          router.replace('/login');
        } else {
          const tokens = await refresh();

          if (tokens) {
            setTokens({ accessToken: tokens.accessToken });
            config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;

            return client(config);
          }
        }
      }

      return Promise.reject(error);
    },
  );

  useEffect(() => {
    return () => {
      client.interceptors.request.eject(requestIntercept);
      client.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return <>{children}</>;
}

const { axiosBasic, client } = createAxios(BASE_URL);

export { axiosBasic, client, AxiosInterceptor };

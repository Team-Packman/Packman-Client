import { AxiosInstance, AxiosRequestConfig } from 'axios';

function withAuth(axios: AxiosInstance) {
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkNmFjYmRjMTBkYzFlMTZiMmE2MzZhIn0sImlhdCI6MTY1ODIzNjA5MywiZXhwIjoxNjU5MTAwMDkzfQ.NLWE8P6cz7Kodzo1lH6eSm3GFxSOeJ0GDKKwBEOseCk';

  const requestIntercept = axios.interceptors.request.use(
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

  return axios;
}

export default withAuth;

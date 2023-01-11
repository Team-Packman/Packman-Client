import { createContext, ReactNode } from 'react';
import { APIService, createAPIService } from '../../service';
import createAxios from '../axios';
import withAuth from '../axios/withAuth';

interface APIProviderProps {
  baseURL: string;
  children: ReactNode;
}

interface APIContext {
  api: APIService;
}

export const APIContext = createContext<APIContext>({
  api: createAPIService(createAxios('')),
});

export const APIProvider = (props: APIProviderProps) => {
  const { children, baseURL } = props;
  const { axiosBasic, axiosWithAuth } = createAxios(baseURL);

  const api = createAPIService({ axiosBasic, axiosWithAuth: withAuth(axiosWithAuth) });

  return <APIContext.Provider value={{ api }}>{children}</APIContext.Provider>;
};

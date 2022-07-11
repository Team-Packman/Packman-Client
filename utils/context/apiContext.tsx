import { createContext, ReactNode } from 'react';
import { APIService, createAPIService } from '../../service';
import createAxios from '../axios/axios';

interface APIProviderProps {
  baseURL: string;
  children: ReactNode;
}

export const APIContext = createContext<APIService>(createAPIService(createAxios('')));

export const APIProvider = (props: APIProviderProps) => {
  const { children, baseURL } = props;

  const axios = createAxios(baseURL);
  const api = createAPIService(axios);

  return <APIContext.Provider value={api}>{children}</APIContext.Provider>;
};

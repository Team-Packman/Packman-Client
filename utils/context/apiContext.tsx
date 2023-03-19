import { createContext, ReactNode } from 'react';
import { APIService, createAPIService } from '../../service';

interface APIProviderProps {
  baseURL: string;
  children: ReactNode;
}

interface APIContext {
  api: APIService;
}

export const APIContext = createContext<APIContext>({
  api: createAPIService(),
});

export const APIProvider = (props: APIProviderProps) => {
  const { children } = props;

  const api = createAPIService();

  return <APIContext.Provider value={{ api }}>{children}</APIContext.Provider>;
};

import axios from 'axios';
import { createContext, ReactNode, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { APIService, createAPIService } from '../../service';
import createAxios from '../axios/axios';
import withAuth from '../axios/withAuth';
import { authedUser } from '../recoil/atom/atom';

interface APIProviderProps {
  children: ReactNode;
}

interface AuthProviderProps {
  baseURL: string;
  children: ReactNode;
}

interface APIContext {
  isAuthed: boolean;
}

interface AuthContext {
  api: APIService;
}

export const APIContext = createContext<APIContext>({
  isAuthed: false,
});

export const APIProvider = (props: APIProviderProps) => {
  const { children } = props;
  const [isAuthed] = useState(false);

  return <APIContext.Provider value={{ isAuthed }}>{children}</APIContext.Provider>;
};

export const AuthContext = createContext<AuthContext>({
  api: createAPIService(axios.create()),
});

export const AuthProvider = (props: AuthProviderProps) => {
  const { children, baseURL } = props;
  const { axiosWithAuth } = createAxios(baseURL);
  const user = useRecoilValue(authedUser);
  const api = createAPIService(withAuth(axiosWithAuth, user));

  return <AuthContext.Provider value={{ api }}>{children}</AuthContext.Provider>;
};

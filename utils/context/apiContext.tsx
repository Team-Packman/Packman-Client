import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { QueryKey } from 'react-query';
import { APIService, createAPIService } from '../../service';
import { User } from '../../type/globalState';
import createAxios from '../axios/axios';
import withAuth from '../axios/withAuth';
import useCache from '../hooks/useCache';
import useGlobalSelector from '../hooks/useGlobalSelector';

interface APIProviderProps {
  children: ReactNode;
}

interface AuthProviderProps {
  baseURL: string;
  children: ReactNode;
}

interface APIContext {
  isAuthed: boolean;
  user: User;
}

interface AuthContext {
  api: APIService;
  setToken: (token: string) => void;
}

export const APIContext = createContext<APIContext>({
  isAuthed: false,
  user: {
    _id: '',
    isAlreadyUser: false,
    accessToken: '',
    email: '',
    name: '',
    profileImageId: '',
  },
});

export const APIProvider = (props: APIProviderProps) => {
  const { children } = props;
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState<User>({
    _id: '',
    isAlreadyUser: false,
    accessToken: '',
    email: '',
    name: '',
    profileImageId: '',
  });

  useEffect(() => {
    const userInfo = localStorage.getItem('User')!;

    if (userInfo && typeof userInfo === 'string') {
      setIsAuthed(true);
      setUser(JSON.parse(userInfo));
    }
  }, [localStorage.getItem('User')]);

  return <APIContext.Provider value={{ isAuthed, user }}>{children}</APIContext.Provider>;
};

export const AuthContext = createContext<AuthContext>({
  api: createAPIService(axios.create()),
  setToken: (token: string) => {},
});

export const AuthProvider = (props: AuthProviderProps) => {
  const { children, baseURL } = props;
  const { isAuthed, user } = useContext(APIContext);
  const Axios = createAxios(baseURL);
  const [api, setApi] = useState<APIService>(
    createAPIService(
      axios.create({
        baseURL,
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkNmFjYmRjMTBkYzFlMTZiMmE2MzZhIn0sImlhdCI6MTY1ODIzNjA5MywiZXhwIjoxNjU5MTAwMDkzfQ.NLWE8P6cz7Kodzo1lH6eSm3GFxSOeJ0GDKKwBEOseCk',
        },
      }),
    ),
  );
  const setToken = (token: string) => {
    console.log(token);
    setApi(
      createAPIService(
        axios.create({
          baseURL,
          headers: {
            Authorization: token,
          },
        }),
      ),
    );
  };
  return <AuthContext.Provider value={{ api, setToken }}>{children}</AuthContext.Provider>;
};

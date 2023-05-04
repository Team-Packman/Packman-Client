import cookie from 'react-cookies';
import { RefreshInput } from '../service/auth';

export const getTokens = (): RefreshInput => {
  const accessToken = cookie.load('accessToken');
  const refreshToken = cookie.load('refreshToken');

  return { accessToken, refreshToken };
};

export const removeTokens = () => {
  cookie.remove('accessToken');
  cookie.remove('refreshToken');
};

export const setTokens = (tokens: Partial<RefreshInput>) => {
  tokens.accessToken && cookie.save('accessToken', tokens.accessToken, {});
  tokens.refreshToken && cookie.save('refreshToken', tokens.refreshToken, {});
};

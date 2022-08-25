import { AxiosInstance } from 'axios';
import { Refresh, KakaoLoginInput, KakaoLoginOutput } from './index';
import { GoogleLoginInput, GoogleLoginOutput } from '.';
import { fetchGoogleLogin, fetchKakaoLogin, fetchRefresh } from '../../utils/axios/auth';
import withAuth from '../../utils/axios/withAuth';

export interface AuthAPI {
  refresh: (accessToken: string, refreshToken: string) => Promise<Refresh>;
  fetchGoogleLogin: (payload: GoogleLoginInput) => Promise<GoogleLoginOutput>;
  fetchKakaoLogin: (payload: KakaoLoginInput) => Promise<KakaoLoginOutput>;
}

const createAuthAPI = (request: AxiosInstance): AuthAPI => {
  return {
    fetchGoogleLogin: (payload: GoogleLoginInput) => fetchGoogleLogin(withAuth(request), payload),
    fetchKakaoLogin: (payload: KakaoLoginInput) => fetchKakaoLogin(withAuth(request), payload),
    refresh: (accessToken, refreshToken: string) =>
      fetchRefresh(request, accessToken, refreshToken),
  };
};

export default createAuthAPI;

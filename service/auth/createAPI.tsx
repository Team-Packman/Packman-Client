import { AxiosInstance } from 'axios';
import { Refresh, KakaoLoginInput, KakaoLoginOutput } from './index';
import { GoogleLoginInput, GoogleLoginOutput } from '.';
import { fetchGoogleLogin, fetchKakaoLogin, fetchRefresh } from '../../utils/axios/auth';
import withAuth from '../../utils/axios/withAuth';
import { Config } from '../../utils/axios/axios';

export interface AuthAPI {
  refresh: (accessToken: string, refreshToken: string) => Promise<Refresh>;
  fetchGoogleLogin: (payload: GoogleLoginInput) => Promise<GoogleLoginOutput>;
  fetchKakaoLogin: (payload: KakaoLoginInput) => Promise<KakaoLoginOutput>;
}

const createAuthAPI = ({ axiosBasic, axiosWithAuth: request }: Config): AuthAPI => {
  return {
    fetchGoogleLogin: (payload: GoogleLoginInput) => fetchGoogleLogin(request, payload),
    fetchKakaoLogin: (payload: KakaoLoginInput) => fetchKakaoLogin(request, payload),
    refresh: (accessToken, refreshToken: string) =>
      fetchRefresh(request, accessToken, refreshToken),
  };
};

export default createAuthAPI;

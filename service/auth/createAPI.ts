import { KakaoLoginInput, KakaoLoginOutput } from './index';
import { GoogleLoginInput, GoogleLoginOutput } from '.';
import { AxiosInstance } from 'axios';

import withAuth from '../../utils/axios/withAuth';
import { fetchGoogleLogin, fetchKakaoLogin } from '../../utils/axios/auth';

export interface AuthAPI {
  fetchGoogleLogin: (payload: GoogleLoginInput) => Promise<GoogleLoginOutput>;
  fetchKakaoLogin: (payload: KakaoLoginInput) => Promise<KakaoLoginOutput>;
}

export const createAuthAPI = (request: AxiosInstance): AuthAPI => {
  return {
    fetchGoogleLogin: (payload: GoogleLoginInput) => fetchGoogleLogin(request, payload),
    fetchKakaoLogin: (payload: KakaoLoginInput) => fetchKakaoLogin(request, payload),
  };
};

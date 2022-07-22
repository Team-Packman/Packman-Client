import { KakaoLoginInput, KakaoLoginOutput } from './index';
import { GoogleLoginInput, GoogleLoginOutput } from '.';
import { AxiosInstance } from 'axios';

import { fetchGoogleLogin, fetchKakaoLogin } from '../../utils/axios/auth';

export interface AuthAPI {
  fetchGoogleLogin: (payload: GoogleLoginInput) => Promise<GoogleLoginOutput>;
  fetchKakaoLogin: (payload: KakaoLoginInput) => Promise<KakaoLoginOutput>;
}

const createAuthAPI = (request: AxiosInstance): AuthAPI => {
  return {
    fetchGoogleLogin: (payload: GoogleLoginInput) => fetchGoogleLogin(request, payload),
    fetchKakaoLogin: (payload: KakaoLoginInput) => fetchKakaoLogin(request, payload),
  };
};

export default createAuthAPI;

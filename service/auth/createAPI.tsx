import {
  RefreshInput,
  RefreshOutput,
  KakaoLoginInput,
  KakaoLoginOutput,
  KakaoAuthOutput,
} from './index';
import { GoogleLoginInput, GoogleLoginOutput } from '.';
import {
  fetchGoogleLogin,
  fetchKakaoAuth,
  fetchKakaoLogin,
  fetchRefresh,
} from '../../utils/axios/auth';
import { Config } from '../../utils/axios';

export interface AuthAPI {
  refresh: (tokens: RefreshInput) => Promise<RefreshOutput>;
  fetchKakaoAuth: (code: string) => Promise<KakaoAuthOutput>;
  fetchGoogleLogin: (payload: GoogleLoginInput) => Promise<GoogleLoginOutput>;
  fetchKakaoLogin: (payload: KakaoLoginInput) => Promise<KakaoLoginOutput>;
}

const createAuthAPI = ({ axiosBasic, axiosWithAuth: request }: Config): AuthAPI => {
  return {
    fetchGoogleLogin: (payload: GoogleLoginInput) => fetchGoogleLogin(request, payload),
    fetchKakaoLogin: (payload: KakaoLoginInput) => fetchKakaoLogin(request, payload),
    fetchKakaoAuth: (code: string) => fetchKakaoAuth(axiosBasic, code),
    refresh: (tokens) => fetchRefresh(axiosBasic, tokens),
  };
};

export default createAuthAPI;

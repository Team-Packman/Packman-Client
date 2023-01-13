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

export interface AuthAPI {
  refresh: (tokens: RefreshInput) => Promise<RefreshOutput>;
  fetchKakaoAuth: (code: string) => Promise<KakaoAuthOutput>;
  fetchGoogleLogin: (payload: GoogleLoginInput) => Promise<GoogleLoginOutput>;
  fetchKakaoLogin: (payload: KakaoLoginInput) => Promise<KakaoLoginOutput>;
}

const createAuthAPI = (): AuthAPI => {
  return {
    fetchGoogleLogin: (payload: GoogleLoginInput) => fetchGoogleLogin(payload),
    fetchKakaoLogin: (payload: KakaoLoginInput) => fetchKakaoLogin(payload),
    fetchKakaoAuth: (code: string) => fetchKakaoAuth(code),
    refresh: (tokens) => fetchRefresh(tokens),
  };
};

export default createAuthAPI;

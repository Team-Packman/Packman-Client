import { RefreshInput, RefreshOutput, KakaoLoginInput, KakaoLoginOutput } from './index';
import { GoogleLoginInput, GoogleLoginOutput } from '.';
import { fetchGoogleLogin, fetchKakaoLogin, fetchRefresh } from '../../utils/axios/auth';
import { Config } from '../../utils/axios/axios';

export interface AuthAPI {
  refresh: (tokens: RefreshInput) => Promise<RefreshOutput>;
  fetchGoogleLogin: (payload: GoogleLoginInput) => Promise<GoogleLoginOutput>;
  fetchKakaoLogin: (payload: KakaoLoginInput) => Promise<KakaoLoginOutput>;
}

const createAuthAPI = ({ axiosBasic, axiosWithAuth: request }: Config): AuthAPI => {
  return {
    fetchGoogleLogin: (payload: GoogleLoginInput) => fetchGoogleLogin(request, payload),
    fetchKakaoLogin: (payload: KakaoLoginInput) => fetchKakaoLogin(request, payload),
    refresh: (tokens) => fetchRefresh(axiosBasic, tokens),
  };
};

export default createAuthAPI;

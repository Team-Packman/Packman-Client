import { KakaoLoginInput, KakaoLoginOutput } from './../../../service/auth/index';
import { AxiosInstance } from 'axios';
import { GoogleLoginInput, GoogleLoginOutput } from '../../../service/auth/index';

export const fetchGoogleLogin = async (
  request: AxiosInstance,
  payload: GoogleLoginInput,
): Promise<GoogleLoginOutput> => {
  const { data } = await request.post(`/auth/google`, payload);
  return data;
};

export const fetchKakaoLogin = async (
  request: AxiosInstance,
  payload: KakaoLoginInput,
): Promise<KakaoLoginOutput> => {
  const { data } = await request.post(`/auth/kakao`, payload);
  return data;
};

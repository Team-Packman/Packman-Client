import {
  KakaoLoginInput,
  KakaoLoginOutput,
  RefreshInput,
  RefreshOutput,
} from './../../../service/auth/index';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
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

export const fetchRefresh = async (
  request: AxiosInstance,
  { accessToken, refreshToken }: RefreshInput,
): Promise<RefreshOutput> => {
  const { data } = await request(`/auth/token`, {
    baseURL: process.env.NEXT_PUBLIC_END,
    headers: {
      Authorization: accessToken,
      Refresh: refreshToken,
    },
  });
  return data;
};

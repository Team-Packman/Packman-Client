import {
  KakaoAuthOutput,
  KakaoLoginInput,
  KakaoLoginOutput,
  RefreshInput,
  RefreshOutput,
} from './../../../service/auth/index';
import { GoogleLoginInput, GoogleLoginOutput } from '../../../service/auth/index';
import { axiosBasic, client } from '..';

export const fetchGoogleLogin = async (payload: GoogleLoginInput): Promise<GoogleLoginOutput> => {
  const { data } = await client.post(`/auth/google`, payload);
  return data;
};

export const fetchKakaoAuth = async (code: string): Promise<KakaoAuthOutput> => {
  const url = encodeURI(process.env.NEXT_PUBLIC_REDIRECT ?? '');
  
  const { data } = await axiosBasic.post(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&code=${code}&redirect_uri=${url}&client_secret=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET}`,

    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return data;
};

export const fetchKakaoLogin = async (payload: KakaoLoginInput): Promise<KakaoLoginOutput> => {
  const { data } = await axiosBasic.post(`/auth/kakao`, payload);
  return data;
};

export const fetchRefresh = async ({
  accessToken,
  refreshToken,
}: RefreshInput): Promise<RefreshOutput> => {
  const { data } = await axiosBasic(`/auth/token`, {
    baseURL: process.env.NEXT_PUBLIC_END,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: refreshToken,
    },
  });
  return data;
};

import { invitationAtom } from './../../../recoil/atom/atom';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useQueryClient, useMutation } from 'react-query';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { RefreshInput, RefreshOutput } from '../../../../service/auth';
import { authUserAtom } from '../../../recoil/atom/atom';
import useReset from '../../recoil/useReset';
import { useErrorBubbling } from '../../../AsyncBoundary';
import apiService from '../../../../service';
import cookie from 'react-cookies';

export const useRefresh = (tokens: RefreshInput) => {
  const router = useRouter();
  const client = useQueryClient();
  const reset = useReset();
  const setUser = useSetRecoilState(authUserAtom);
  const { reportError } = useErrorBubbling();

  const refresh = async () => {
    try {
      const { data } = await client.fetchQuery<RefreshOutput>('refresh', () =>
        apiService.auth.refresh(tokens),
      );
      cookie.save('accessToken', data.accessToken, {});
      cookie.save('refreshToken', data.refreshToken, {});
      setUser((prev) => ({ ...prev, ...data }));

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
          case 401: {
            reset();
            alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
            router.replace('/login');
            return;
          }
        }
      }

      reset();
      reportError(error);
    }
  };

  return refresh;
};

export const useKaKaoFlow = (): [typeof kakaoAuth, typeof kakaoLogin] => {
  const fetchKakaoAuth = apiService.auth.fetchKakaoAuth;
  const fetchKakaoLogin = apiService.auth.fetchKakaoLogin;

  const kakaoAuth = useMutation('fetchKakaoAuth', fetchKakaoAuth);
  const kakaoLogin = useMutation('fetchKakaoLogin', fetchKakaoLogin);

  return [kakaoAuth, kakaoLogin];
};

export const useAddMemberMutation = () => {
  const addMember = apiService.packingList.together.addMember;
  const { mutate: addMemberMutate } = useMutation('addMember', addMember);

  return addMemberMutate;
};

export const useCheckInvitation = (inviteCode: string) => {
  const client = useQueryClient();
  const resetInvitation = useResetRecoilState(invitationAtom);
  const { reportError } = useErrorBubbling();

  const getAloneInvited = apiService.packingList.alone.getInvited;
  const getTogetherInvited = apiService.packingList.together.getInvited;

  const checkInvitation = async function (type: 'alone' | 'together') {
    try {
      if (type === 'alone') {
        const { data } = await client.fetchQuery(['aloneInvited', inviteCode], () =>
          getAloneInvited(inviteCode),
        );
        return data;
      } else {
        const { data } = await client.fetchQuery(['togetherInvited', inviteCode], () =>
          getTogetherInvited(inviteCode),
        );
        return data;
      }
    } catch (error) {
      resetInvitation();
      reportError(error);
    }
  };

  return checkInvitation;
};

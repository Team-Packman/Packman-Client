import { useAddMemberMutation, useCheckInvitation, useKaKaoFlow } from './../queries/auth/auth';
import { authUserAtom, invitationAtom, kakao, creatingUserAtom } from './../../recoil/atom/atom';
import { useRecoilState, useResetRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

export const useKaKaoLogin = () => {
  const router = useRouter();
  const [{ mutate: kakaoAuth }, { mutate: kakaoLogin }] = useKaKaoFlow();

  const [user, setUser] = useRecoilState(authUserAtom);
  const resetInvitation = useResetRecoilState(invitationAtom);
  const setKakaoInfo = useSetRecoilState(kakao);
  const setCreatingUser = useSetRecoilState(creatingUserAtom);

  const login = (code: string | string[]) => {
    kakaoAuth(code as string, {
      onSuccess: ({ access_token: accessToken }) => {
        kakaoLogin(
          {
            accessToken,
          },
          {
            onSuccess: ({ data }) => {
              if (data.isAlreadyUser) {
                setUser(data as typeof user);
              } else {
                setCreatingUser(data);
                resetInvitation();
                router.replace('/profile');
              }
            },
            onError: () => router.replace('/login'),
          },
        );
        setKakaoInfo({
          accessToken,
        });
      },
    });
  };

  return login;
};

export const useInvitation = () => {
  const router = useRouter();
  const { inviteCode } = useRecoilValue(invitationAtom);
  const resetInvitation = useResetRecoilState(invitationAtom);

  const addMember = useAddMemberMutation();
  const checkInvitation = useCheckInvitation(inviteCode);

  const receiveGuest = async () => {
    const { id: listId, isMember } = await checkInvitation();

    if (!inviteCode) {
      router.replace('/folder');
    } else if (isMember) {
      router.replace(`/together?id=${listId}`);
    } else {
      addMember(
        { listId },
        {
          onSuccess: ({ data: { listId } }) => router.replace(`/together?id=${listId}`),
          onError: () => router.replace('/folder'),
        },
      );
    }

    resetInvitation();
  };

  return receiveGuest;
};

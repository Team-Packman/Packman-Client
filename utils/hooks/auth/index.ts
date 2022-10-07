import { GetAloneInvitedOutput } from './../../../service/packingList/alone/index';
import { useAddMemberMutation, useCheckInvitation, useKaKaoFlow } from './../queries/auth/auth';
import { authUserAtom, invitationAtom, kakao, creatingUserAtom } from './../../recoil/atom/atom';
import { useRecoilState, useResetRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { GetInvitedOutput } from '../../../service/packingList/together';
import cookie from 'react-cookies';

export const useKaKaoLogin = () => {
  const router = useRouter();
  const [{ mutate: kakaoAuth }, { mutate: kakaoLogin }] = useKaKaoFlow();

  const [user, setUser] = useRecoilState(authUserAtom);
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
              cookie.save('accessToken', data.accessToken + '', {});

              if (data.isAlreadyUser) {
                setUser(data as typeof user);
              } else {
                setCreatingUser(data);
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
      onError: () => router.replace('/login'),
    });
  };

  return login;
};

export const useInvitation = () => {
  const router = useRouter();
  const { type, inviteCode, folderId } = useRecoilValue(invitationAtom);
  const resetInvitation = useResetRecoilState(invitationAtom);

  const addMember = useAddMemberMutation();
  const checkInvitation = useCheckInvitation(inviteCode);

  const receiveGuest = async () => {
    if (!inviteCode) {
      router.replace('/folder');
    } else {
      if (type === 'alone') {
        const { id: listId, isOwner } = (await checkInvitation(
          type,
        )) as GetAloneInvitedOutput['data'];

        if (isOwner) {
          router.replace(`/alone?id=${listId}`);
        } else {
          router.replace(`/alone/shared?id=${listId}`);
        }
      } else if (type === 'together') {
        const { id: listId, isMember } = (await checkInvitation(type)) as GetInvitedOutput['data'];

        if (isMember) {
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
      }

      resetInvitation();
    }
  };

  return receiveGuest;
};

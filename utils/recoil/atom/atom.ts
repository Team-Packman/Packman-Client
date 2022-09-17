import { AuthUser, ErrorFlag, CreatingUser, Invitation, ListState, Kakao } from './';
import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

const { persistAtom } = recoilPersist();

export const authUserAtom = atom<AuthUser>({
  key: 'USER',
  default: {
    isAlreadyUser: false,
    id: '',
    name: '',
    nickname: '',
    email: '',
    profileImage: '',
    accessToken: '',
    refreshToken: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const creatingUserAtom = atom<CreatingUser>({
  key: 'creatingUser',
  default: {
    isAlreadyUser: false,
    name: '',
    email: '',
  },
});

export const invitationAtom = atom<Invitation>({
  key: 'invitation',
  default: {
    type: 'alone',
    inviteCode: '',
    folderId: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const kakao = atom<Kakao>({
  key: 'kakao',
  default: {
    accessToken: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const listState = atom<ListState>({
  key: 'listState',
  default: {
    isFresh: false,
  },
});

export const errorFlagAtom = atom<ErrorFlag>({
  key: 'errorFlag',
  default: false,
});

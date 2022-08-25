import { AuthUser, CreatingUser, From, Kakao } from './';
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

export const from = atom<From>({
  key: 'from',
  default: {
    url: '',
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

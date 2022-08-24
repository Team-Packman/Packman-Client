import { User, From, Kakao } from './';
import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

const { persistAtom } = recoilPersist();

export const authedUser = atom<User>({
  key: 'USER',
  default: {
    isAlreadyUser: false,
    name: '',
    email: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const creatingUser = atom<User>({
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

import { User, From, Kakao } from './';
import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

const { persistAtom } = recoilPersist();

export const authedUser = atom<User>({
  key: 'USER',
  default: {
    _id: '',
    email: '',
    name: '',
    profileImageId: '',
    accessToken: '',
    isAlreadyUser: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const creatingUser = atom<User>({
  key: 'creatingUser',
  default: {
    _id: '',
    email: '',
    name: '',
    profileImageId: '',
    accessToken: '',
    isAlreadyUser: false,
  },
});

export const from = atom<From>({
  key: 'from',
  default: {
    url: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const kakaoAccessToken = atom<Kakao>({
  key: 'KAKAO',
  default: {
    accessToken: '',
  },
});

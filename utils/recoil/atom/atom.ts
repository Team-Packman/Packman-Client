import { AuthUser, CreatingUser, Invitation, Kakao } from './';
import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

const { persistAtom } = recoilPersist();

export const initialAuthUser = {
  isAlreadyUser: false,
  id: '',
  name: '',
  nickname: '',
  email: '',
  profileImage: '',
  accessToken: '',
  refreshToken: '',
};

export const authUserAtom = atom<AuthUser>({
  key: 'USER',
  default: initialAuthUser,
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

export const initialInvitation = {
  listId: '',
  isMember: false,
};

export const invitationAtom = atom<Invitation>({
  key: 'invitation',
  default: initialInvitation,
  effects_UNSTABLE: [persistAtom],
});

export const kakao = atom<Kakao>({
  key: 'kakao',
  default: {
    accessToken: '',
  },
  effects_UNSTABLE: [persistAtom],
});

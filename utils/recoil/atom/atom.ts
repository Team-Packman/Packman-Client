import { AuthUser, ErrorFlag, CreatingUser, Invitation, ListState, Kakao } from './';
import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

const { persistAtom } = recoilPersist();

export const authUserAtomDefault = {
  isAlreadyUser: false, // 이미 존재하는 유저 확인
  id: '', // 생성된 유저 id
  email: '', // 생성된 유저 email
  name: '', //생성된 유저의 카카오톡 프로필 네임
  gender: '', // 생성된 유저 성별
  ageRange: '', // 생성된 유저 연령대
  nickname: '', // 생성된 유저 닉네임
  profileImage: '', // 생성된 유저 이미지 id
  accessToken: '', // 팩맨에서 사용하는 accessToken
  refreshToken: '', // 팩맨에서 사용하는 refreshToken
};

export const authUserAtom = atom<AuthUser>({
  key: 'USER',
  default: authUserAtomDefault,
  effects_UNSTABLE: [persistAtom],
});

export const creatingUserAtom = atom<CreatingUser>({
  key: 'creatingUser',
  default: {
    isAlreadyUser: false,
    name: '',
    email: '',
    gender: '',
    ageRange: '',
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

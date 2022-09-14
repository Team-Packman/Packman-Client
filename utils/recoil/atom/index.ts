export interface CreatingUser {
  isAlreadyUser: boolean; // 이미 존재하는 유저 확인
  name: string; //생성된 유저의 카카오톡 프로필 네임
  email: string; // 생성된 유저 email
}

export interface AuthUser extends CreatingUser {
  id: string; // 생성된 유저 id
  nickname: string; // 생성된 유저 닉네임
  profileImage: string; // 생성된 유저 이미지 id
  accessToken: string; // 팩맨에서 사용하는 accessToken
  refreshToken: string; // 팩맨에서 사용하는 refreshToken
}

export interface Invitation {
  type: 'alone' | 'together';
  inviteCode: string;
}

export interface Kakao {
  accessToken: string;
}

export interface ListState {
  isFresh: boolean;
}
export type ErrorFlag = boolean;

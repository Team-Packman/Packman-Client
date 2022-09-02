export interface GetUserInfoOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string; // 로그인된 유저 아이디
    nickname: string; // 로그인된 유저 닉네임
    email: string; // 로그인된 유저 이메일
    profileImage: string; // 로그인된 유저의 이미지 id
  };
}

export interface DeleteUserInfoOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string; // 삭제된 유저 id
  };
}

export interface UpdateUserProfileInput {
  nickname: string;
  profileImage: string;
}

export interface UpdateUserProfileOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string; // 수정된 유저의 id
    nickname: string; // 수정된 유저의 닉네임
    email: string; // 수정된 유저의 이메일
    profileImage: string; // 수정된 유저의 프로필 이미지id
  };
}

export interface AddUserProfileInput {
  email: string; // 회원가입한 유저의 이메일
  name: string; //회원가입한 유저의 카카오 프로필 네임
  nickname: string; // 회원가입한 유저의 닉네임
  profileImage: string; // 회원가입한 유저의 프로필 이미지
}
export interface AddUserProfileOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    isAlreadyUser: boolean; // 이미 존재하는 유저 확인
    id: string; // 생성된 유저 id
    name: string; //생성된 유저 네임
    nickname: string; // 생성된 유저 닉네임
    email: string; // 생성된 유저 email
    profileImage: string; // 생성된 유저 이미지 id
    accessToken: string; // 팩맨에서 사용하는 accessToken
    refreshToken: string; // 팩맨에서 사용하는 refreshToken
  };
}

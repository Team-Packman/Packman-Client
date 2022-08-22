export interface GetUserInfoOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string; // 로그인된 유저 아이디
    name: string; // 로그인된 유저 닉네임
    email: string; // 로그인된 유저 이메일
    profileImageId: string; // 로그인된 유저의 이미지 id
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
  name: string;
  profileImageId: string;
}

export interface UpdateUserProfileOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string; // 수정된 유저의 id
    name: string; // 수정된 유저의 닉네임
    email: string; // 수정된 유저의 이메일
    profileImageId: string; // 수정된 유저의 프로필 이미지id
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
    _id: string; // 생성된 유저 id
    name: string; // 생성된 유저 닉네임
    email: string; // 생성된 유저 email
    profileImageId: string; // 생성된 유저 이미지 id
    accessToken: string; // 팩맨에서 사용하는 accessToken
    isAlreadyUser: boolean; // 이미 존재하는 유저 확인
  };
}

export interface GetKakaoProfileInfoOutput {
  kakao_account: {
    profile: {
      nickname: string;
    };
  };
}

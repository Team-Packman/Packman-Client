export interface GetUserInfoOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string; // 로그인된 유저 아이디
    nickname: string; // 로그인된 유저 닉네임
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

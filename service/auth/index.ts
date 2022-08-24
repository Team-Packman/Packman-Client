export interface GoogleLoginInput {
  accessToken: string;
}

export interface GoogleLoginOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    isAlreadyUser: boolean; // 기존 유저인지
    accessToken: string; // 팩맨에서 쓰이는 accessToken
    _id: string; //유저 id
    email: string; //유저 이메일
    name: string; // 유저 닉네임
    profileImageId: string; // 유저 프로필 이미지 id
  };
}

export interface KakaoLoginInput {
  accessToken: string;
}

export interface KakaoLoginOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    isAlreadyUser: boolean; // 이미 존재하는 유저 확인
    name: string; //생성된 유저의 카카오톡 프로필 네임
    email: string; // 생성된 유저 email
    id?: string; // 생성된 유저 id
    nickname?: string; // 생성된 유저 닉네임
    profileImage?: string; // 생성된 유저 이미지 id
    accessToken?: string; // 팩맨에서 사용하는 accessToken
    refreshToken?: string; // 팩맨에서 사용하는 refreshToken
  };
}

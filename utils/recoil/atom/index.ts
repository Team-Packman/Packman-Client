export interface User {
  isAlreadyUser: boolean; // 이미 존재하는 유저 확인
  _id: string; // 생성된 유저 id
  name: string; // 생성된 유저 닉네임
  email: string; // 생성된 유저 email
  profileImageId: string; // 생성된 유저 이미지 id
  accessToken: string; // 팩맨에서 사용하는 accessToken
}

export interface From {
  url: string;
}

export interface Kakao {
  accessToken: string;
  nickname: string;
}

export interface Auth {
  email: string;
}
export interface User {
  email: string; // 회원가입한 유저의 이메일
  name: string; // 회원가입한 유저의 닉네임
  profileImageId: string; // 회원가입한 유저의 프로필 이미지
}

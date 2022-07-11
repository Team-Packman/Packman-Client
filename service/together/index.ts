export interface GroupMembersOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    members: {
      // 그룹에 속한 멤버 배열
      id: string; //  멤버 id
      nickname: string; // 멤버 닉네임
      profileImageId: string; // 멤버 프로필 사진 id
    }[];
  };
}

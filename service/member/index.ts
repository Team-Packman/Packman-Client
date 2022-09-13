export interface GetGroupMemberInput {
  listId: string;
}

export interface GetGroupMemberOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    title: string; // 함께 패킹리스트 제목
    departureDate: string; // 함께 패킹리스트 출발 날짜
    remainDay: string; // 함께 패킹리스트 남은 출발 날짜
    member: {
      // 그룹에 속한 멤버 배열
      id: string; //  멤버 id
      nickname: string; // 멤버 닉네임
      profileImage: string; // 멤버 프로필 사진 id
    }[];
    inviteCode: string; // 함께 패킹리스트 초대코드
  };
}

export interface DeleteGroupMemberInput {
  groupId: string;
  userId: string;
}

export interface DeleteGroupMemberOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    member: {
      // 그룹에 속한 멤버 배열
      id: string; //  멤버 id
      nickname: string; // 멤버 닉네임
      profileImage: string; // 멤버 프로필 사진 id
    }[];
  };
}

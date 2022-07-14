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

export interface TogetherPackingListOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    currentFolder: {
      // 현재 폴더 정보
      id: string; // 현재 폴더 id
      title: string; // 현재 폴더 이름
    };
    folder: {
      // 폴더
      id: string; // 폴더 id
      title: string; // 폴더 제목
    }[];
    listNum: number; // 폴더 안 리스트 수
    togetherPackingList: {
      id: string; // 함께 패킹리스트 id
      departureDate: string; // 함께 패킹리스트 출발 날짜
      title: string; // 함께 패킹리스트 제목
      packTotalNum: number; // 함께 패킹리스트의 총 짐의 수
      packRemainNum: number; // 함께 패킹리스트의 체크안된 짐의 수
    }[];
  };
}

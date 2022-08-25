export interface GetTogetherInventoryOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    currentFolder: {
      // 현재 폴더 정보
      id: string; // 현재 폴더 id
      name: string; // 현재 폴더 이름
    };
    folder: {
      // 폴더
      id: string; // 폴더 id
      name: string; // 폴더 제목
    }[];
    listNum: string; // 폴더 안 리스트 수
    togetherPackingList: {
      id: string; // 함께 패킹리스트 id
      title: string; // 함께 패킹리스트 제목
      departureDate: string; // 함께 패킹리스트 출발 날짜
      packTotalNum: string; // 함께 패킹리스트의 총 짐의 수
      packRemainNum: string; // 함께 패킹리스트의 체크안된 짐의 수
    }[];
  };
}

export interface DeleteTogetherInventoryInput {
  folderId: string;
  listId: string;
}
export interface DeleteTogetherInventoryOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    togetherPackingList: {
      _id: string; // 함께 패킹리스트 id
      departureDate: string; // 함께 패킹리스트 출발 날짜
      title: string; // 함께 패킹리스트 제목
      packTotalNum: number; // 함께 패킹리스트의 총 짐의 수
      packRemainNum: number; // 함께 패킹리스트의 체크안된 짐의 수
    }[];
  };
}

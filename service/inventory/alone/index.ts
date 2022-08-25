export interface GetAloneInventoryOutput {
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
      // 폴더 리스트
      id: string; // 폴더id
      name: string; // 폴더 이름
    }[];
    listNum: string; // 폴더 속 리스트 개수
    alonePackingList: {
      id: string; // 혼자 패킹리스트 아이디
      departureDate: string; // 혼자 패킹리스트 출발 일시
      title: string; // 혼자 패킹리스트 제목
      packTotalNum: string; // 혼자 패킹리스트 총 짐 개수
      packRemainNum: string; // 혼자 패킹리스트 남은 짐 개수
    }[];
  };
}

export interface DeleteAloneInventoryInput {
  folderId: string;
  listId: string;
}
export interface DeleteAloneInventoryOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    alonePackingList: {
      id: string; // 혼자 패킹리스트 id
      departureDate: string; // 혼자 패킹리스트 출발 날짜
      name: string; // 혼자 패킹리스트 제목
      packTotalNum: number; // 혼자 패킹리스트의 총 짐의 수
      packRemainNum: number; // 혼자 패킹리스트의 체크안된 짐의 수
    }[];
  };
}

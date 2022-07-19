export interface GetPackingListWithFoldersOutput {
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
      // 폴더 리스트
      id: string; // 폴더id
      title: string; // 폴더 이름
    }[];
    listNum: number; // 폴더 속 리스트 개수
    alonePackingList: {
      id: string; // 패킹리스트 아이디
      departureDate: string; // 패킹리스트 출발 일시
      title: string; // 패킹리스트 제목
      packTotalNum: number; // 패킹리스트 총 짐 개수
      packRemainNum: number; // 패킹리스트 남은 짐 개수
    }[];
  };
}

export interface GetAlonePackingListDetailOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string; // 혼자 패킹리스트 id
    title: string; // 혼자 패킹리스트 제목
    departureDate: string; // 혼자 패킹리스트 출발 일시
    category: {
      _id: string; // 혼자 패킹리스트 카테고리id
      name: string; // 혼자 패킹리스트 카테고리 이름
      pack: {
        _id: string; // 해당 카테고리에 포함된 짐id
        name: string; // 해당 카테고리에 포함된 짐 이름
        isChecked: boolean; // 짐 챙김 여부 챙겼을 경우 true
        packer: null;
      }[];
    }[];
    isSaved: false; // 혼자 패킹리스트 나만의 템플릿 추가 여부
  };
}

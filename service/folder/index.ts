export interface GetFoldersOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    aloneFolders: {
      // 혼자 패킹 폴더 배열
      id: string; // 폴더 id
      title: string; // 폴더 이름
      listNum: number; // 폴더가 가지고 있는 리스트의 개수
    }[];
    togetherFolders: {
      // 함께 패킹 폴더 배열
      id: string; // 폴더 id
      title: string; // 폴더 이름
      listNum: number; // 폴더가 가지고 있는 리스트의 개수
    }[];
  };
}

export interface AddFolderInput {
  title: string; // 폴더 이름
  isAloned: boolean; // 혼자/함께 패킹 폴더 구분
}

export interface AddFolderOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    aloneFolders: {
      // 혼자 패킹 폴더 배열
      id: string; // 폴더 id
      title: string; // 폴더 이름
      listNum: number; // 폴더가 가지고 있는 리스트의 개수
    }[];
    togetherFolders: {
      // 함께 패킹 폴더 배열
      id: string; // 폴더 id
      title: string; // 폴더 이름
      listNum: number; // 폴더가 가지고 있는 리스트의 개수
    }[];
  };
}

export interface EditFolderNameInput {
  id: string; // 수정할 폴더 id
  title: string; // 수정한 폴더 이름
}

export interface EditFolderNameOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    aloneFolders: {
      // 혼자 패킹 폴더 배열
      id: string; // 폴더 id
      title: string; // 폴더 이름
      listNum: number; // 폴더가 가지고 있는 리스트의 개수
    }[];
    togetherFolders: {
      // 함께 패킹 폴더 배열
      id: string; // 폴더 id
      title: string; // 폴더 이름
      listNum: number; // 폴더가 가지고 있는 리스트의 개수
    }[];
  };
}

export interface DeleteFolderOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    aloneFolders: {
      // 혼자 패킹 폴더 배열
      id: string; // 폴더 id
      title: string; // 폴더 이름
      listNum: number; // 폴더가 가지고 있는 리스트의 개수
    }[];
    togetherFolders: {
      // 함께 패킹 폴더 배열
      id: string; // 폴더 id
      title: string; // 폴더 이름
      listNum: number; // 폴더가 가지고 있는 리스트의 개수
    }[];
  };
}

export interface GetRecentPackingListOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string; // 최근 수정한 패킹리스트 id
    title: string; // 최근 수정한 패킹리스트 제목
    remainDay: number; // 최근 수정한 패킹리스트 남은 날짜
    packTotalNum: number; // 최근 수정한 패킹리스트의 총 짐의 수
    packRemainNum: number; // 최근 수정한 패킹리스트의 체크안된 짐의 수
    isAloned: boolean; // 혼자/함께 패킹리스트 여부
  };
}

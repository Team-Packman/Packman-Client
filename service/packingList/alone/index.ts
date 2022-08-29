export interface GetPackingListWithFoldersOutput {
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
    listNum: number; // 폴더 속 리스트 개수
    alonePackingList: {
      id: string; // 패킹리스트 아이디
      departureDate: string; // 패킹리스트 출발 일시
      title: string; // 패킹리스트 제목
      packTotalNum: string; // 패킹리스트 총 짐 개수
      packRemainNum: string; // 패킹리스트 남은 짐 개수
    }[];
  };
}

export interface GetAloneFolderOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    aloneFolder: {
      // 혼자 패킹 폴더 배열
      id: string; // 폴더 id
      name: string; // 폴더 이름
    }[];
  };
}
export interface AddAlonePackingListIntroInput {
  departureDate: string; //출발 날짜
  folderId: string; // 폴더 id
  title: string; // 혼자 패킹리스트 이름
  templateId: string; // 템플릿 id
}

export interface AddAlonePackingListIntroOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    departureDate: string;
    category: {
      id: string;
      name: string;
      pack: {
        id: string;
        name: string;
        isChecked: boolean;
        packer: null;
      }[];
    }[];
    isSaved: boolean;
  };
}

export interface AddAlonePackingListCategoryInput {
  name: string; //혼자 패킹리스트에서 생성한 카테고리 이름
  listId: string; //혼자 패킹리스트 id
}

export interface AddAlonePackingListCategoryOutput {
  status: string;
  success: boolean;
  message: string;
  data: {
    _id: string; // 패킹리스트 id
    category: {
      _id: string; // 패킹리스트 카테고리 id
      name: string;
      pack: {
        _id: string; // 패킹리스트 카테고리 속 짐 id
        name: string;
        isChecked: boolean;
        packer: null;
      }[];
    }[];
  };
}

export interface UpdateAlonePackingListCategoryInput {
  id: string; // 혼자 패킹리스트 카테고리 id
  nickname: string; // 혼자 패킹리스트 카테고리 이름
  listId: string; // 혼자 패킹리스크 id
}

export interface UpdateAlonePackingListCategoryOutput {
  status: string;
  success: boolean;
  message: string;
  data: {
    id: string; // 패킹리스트 id
    category: {
      id: string; // 패킹리스트 카테고리 id
      name: string;
      pack: {
        id: string; // 패킹리스트 카테고리 속 짐 id
        nickname: string;
        isChecked: boolean;
        packer: null;
      }[];
    }[];
  };
}

export interface DeleteAlonePackingListCategoryInput {
  listId: string; // 혼자 패킹리스크 id
  categoryId: string;
}

export interface DeleteAlonePackingListCategoryOutput {
  status: string;
  success: boolean;
  message: string;
  data: {
    _id: string; //  패킹리스트 id
    category: {
      _id: string; // 패킹리스트 카테고리 id
      name: string;
      pack: {
        _id: string; // 패킹리스트 카테고리 속 짐 id
        name: string;
        isChecked: boolean;
        packer: null;
      }[];
    }[];
  };
}

export interface AddAlonePackingListItemInput {
  name: string; // 혼자 패킹리스트 짐 이름
  categoryId: string; // 혼자 패킹리스트 짐 카테고리 id
  listId: string; // 혼자 패킹리스트 id
}

export interface AddAlonePackingListItemOutput {
  status: string;
  success: boolean;
  message: string;
  data: {
    _id: string; // 패킹리스트 id
    category: {
      _id: string; // 패킹리스트 카테고리 id
      name: string;
      pack: {
        _id: string; // 패킹리스트 카테고리 속 짐 id
        name: string;
        isChecked: boolean;
        packer: null;
      }[];
    }[];
  };
}

export interface UpdateAlonePackingListItemInput {
  id: string; // 혼자 패킹리스트 짐 idㅍ
  name: string; // 혼자 패킹리스트 짐
  isChecked: boolean; // 혼자 패킹리스트 짐 체크 여부
  listId: string; // 혼자 패킹리스트 id
  categoryId: string; // 함께 패킹리스트 카테고리 id
}

export interface UpdateAlonePackingListItemOutput {
  status: string;
  success: boolean;
  message: string;
  data: {
    _id: string; // 패킹리스트 id
    category: {
      _id: string; // 패킹리스트 카테고리 id
      name: string;
      pack: {
        _id: string; // 패킹리스트 카테고리 속 짐 id
        name: string;
        isChecked: boolean;
        packer: null;
      }[];
    }[];
  };
}

export interface DeleteAlonePackingListItemInput {
  listId: string; // 혼자 패킹리스트 id
  categoryId: string; // 함께 패킹리스트 카테고리 id
  packId: string;
}

export interface DeleteAlonePackingListItemOutput {
  status: string;
  success: boolean;
  message: string;
  data: {
    _id: string; // 패킹리스트 id
    category: {
      _id: string; // 패킹리스트 카테고리 id
      name: string;
      pack: {
        _id: string; // 패킹리스트 카테고리 속 짐 id
        name: string;
        isChecked: boolean;
        packer: null;
      }[];
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

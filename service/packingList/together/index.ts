export interface UpdatePackingListTitleInput {
  _id: string; // 패킹리스트 id
  title: string; // 패킹리스트 이름
  isAloned: boolean; // 혼자/함께 패킹 리스트 구분
}

export interface UpdatePackingListTitleOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string; // 패킹리스트 id
    title: string; // 수정된 패킹리스트 이름
  };
}

export interface GetGroupMembersOutput {
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

/**
 * 수정 필요
 */
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

export interface GetTogetherPackingListDeatilOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    title: string; // 패킹리스트 제목
    departureDate: string; // 출발 날짜
    togetherPackingList: {
      _id: string; // 함께 패킹리스트 id
      groupId: string; //그룹 id
      category: {
        // 카테고리
        _id: string; // 카테고리 id
        name: string; // 카테고리 이름
        pack: {
          // 짐
          _id: string; // 짐 id
          name: string; // 짐 이름
          isChecked: boolean; // 짐 챙김 여부
          packer: {
            _id: string; // 짐 챙길사람 id
            name: string; // 짐 챙길사람 이름
          } | null;
        }[];
      }[];
      inviteCode: string;
      isSaved: boolean;
    };
    myPackingList: {
      _id: string; // 혼자 패킹리스트 id
      category: {
        // 카테고리
        _id: string; // 카테고리 id
        name: string; // 카테고리 이름
        pack: {
          // 짐
          _id: string; // 짐 id
          name: string; // 짐 이름
          isChecked: boolean; // 짐 체크 여부
          packer: null;
        }[];
      }[];
    };
  };
}

export interface AddTogetherPackingListCategoryInput {
  name: string; // 함께 패킹리스트에서 생성한 카테고리 이름
  listId: string; // 함께 패킹리스트 id
}

export interface AddTogetherPackingListCategoryOutput {
  status: string;
  success: boolean;
  message: string;
  data: {
    _id: string; // 함께 패킹리스트 id
    category: {
      _id: string; // 함께 패킹리스트 카테고리 id
      name: string;
      pack: {
        _id: string; // 함께 패킹리스트 카테고리 속 짐 id
        name: string;
        isChecked: boolean;
        packer: {
          _id: string;
          name: string;
        } | null;
      }[];
    }[];
  };
}

export interface UpdateTogetherPackingListCategoryInput {
  _id: string; // 수정한 카테고리 id
  name: string; // 수정한 카테고리 이름
  listId: string; // 함께 패킹 리스트 id
}

export interface UpdateTogetherPackingListCategoryOutput {
  status: string;
  success: boolean;
  message: string;
  data: {
    _id: string; // 함께 패킹리스트 id
    category: {
      _id: string; // 함께 패킹리스트 카테고리 id
      name: string;
      pack: {
        _id: string; // 함께 패킹리스트 카테고리 속 짐 id
        name: string;
        isChecked: boolean;
        packer: {
          _id: string;
          name: string;
        } | null;
      }[];
    }[];
  };
}

export interface AddTogetherPackingListItemInput {
  name: string; // 함께 패킹리스트 짐 이름
  categoryId: string; // 함께 패킹리스트 짐 카테고리 id
  listId: string; // 함께 패킹리스트 id
}

export interface AddTogetherPackingListItemOutput {
  status: string;
  success: boolean;
  message: string;
  data: {
    _id: string; // 함께 패킹리스트 id
    category: {
      _id: string; // 함께 패킹리스트 카테고리 id
      name: string;
      pack: {
        _id: string; // 함께 패킹리스트 카테고리 속 짐 id
        name: string;
        isChecked: boolean;
        packer: {
          _id: string;
          name: string;
        } | null;
      }[];
    }[];
  };
}

export interface UpdateTogetherPackingListItemInput {
  _id: string; // 함께 패킹리스트 짐 id
  name: string; // 함께 패킹리스트 짐 이름
  isChecked: boolean; // 함께 패킹리스트 짐 체크 여부
  listId: string; // 함께 패킹리스트 id
  categoryId: string; // 함께 패킹리스트 카테고리 id
}

export interface UpdateTogetherPackingListItemOutput {
  status: string;
  success: boolean;
  message: string;
  data: {
    _id: string; // 함께 패킹리스트 id
    category: {
      _id: string; // 함께 패킹리스트 카테고리 id
      name: string;
      pack: {
        _id: string; // 함께 패킹리스트 카테고리 속 짐 id
        name: string;
        isChecked: boolean;
        packer: {
          _id: string;
          name: string;
        } | null;
      }[];
    }[];
  };
}

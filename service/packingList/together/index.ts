export interface UpdatePackingListTitleInput {
  id: string; // 패킹리스트 id
  title: string; // 패킹리스트 이름
  isAloned: boolean; // 혼자/함께 패킹 리스트 구분
}

export interface UpdatePackingListTitleOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string; // 패킹리스트 id
    title: string; // 수정된 패킹리스트 이름
  };
}

export interface UpdatePackingListDateInput {
  id: string; // 패킹리스트 id
  departureDate: string; // 패킹리스트 출발 날짜
  isAloned: boolean; // 혼자/함께 패킹 리스트 구분
}

export interface UpdatePackingListDateOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string; // 패킹리스트 id
    departureDate: string; // 수정된 패킹리스트 출발 날짜
  };
}

export interface UpdatePackingListIsSavedInput {
  id: string; // 패킹리스트 id
  isSaved: boolean; // 패킹리스트 템플릿 저장 여부
  isAloned: boolean; // 혼자/함께 패킹 리스트 구분
}

export interface UpdatePackingListIsSavedOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string; // 혼자 패킹리스트 id
    isSaved: boolean; // 수정된 나만의 템플릿 저장 여부
  };
}

export interface UpdatePackingListPackerInput {
  listId: string; // 패킹리스트 id
  packId: string; // 짐 id
  packerId: string; // 짐 챙길 사람 id
}

export interface UpdatePackingListPackerOutput {
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

export interface GetGroupMembersOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    members: {
      // 그룹에 속한 멤버 배열
      _id: string; //  멤버 id
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

export interface GetTogetherPackingListDetailOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string; //함께패킹리스트-나의 패킹리스트 연결 키(본 키로 함께 패킹리스트 구분)
    title: string; // 패킹리스트 제목
    departureDate: string; // 출발 날짜
    togetherPackingList: {
      id: string; // 함께 패킹리스트 id
      groupId: string; //그룹 id
      category: {
        // 카테고리
        id: string; // 카테고리 id
        name: string; // 카테고리 이름
        pack: {
          // 짐
          id: string; // 짐 id
          name: string; // 짐 이름
          isChecked: boolean; // 짐 챙김 여부
          packer: {
            id: string; // 짐 챙길사람 id
            nickname: string; // 짐 챙길사람 이름
          } | null;
        }[];
      }[];
      inviteCode: string;
      isSaved: boolean;
    };
    myPackingList: {
      id: string; // 혼자 패킹리스트 id
      category: {
        // 카테고리
        id: string; // 카테고리 id
        name: string; // 카테고리 이름
        pack: {
          // 짐
          id: string; // 짐 id
          name: string; // 짐 이름
          isChecked: boolean; // 짐 체크 여부
          packer: null;
        }[];
      }[];
    };
    group: {
      id: string;
      member: {
        // 그룹에 속한 멤버 배열
        id: string; //  멤버 id
        nickname: string; // 멤버 닉네임
        profileImage: string; // 멤버 프로필 사진 id
      }[];
    };
    isMember: boolean;
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
  id: string; // 수정한 카테고리 id
  nickname: string; // 수정한 카테고리 이름
  listId: string; // 함께 패킹 리스트 id
}

export interface UpdateTogetherPackingListCategoryOutput {
  status: string;
  success: boolean;
  message: string;
  data: {
    id: string; // 함께 패킹리스트 id
    category: {
      id: string; // 함께 패킹리스트 카테고리 id
      name: string;
      pack: {
        id: string; // 함께 패킹리스트 카테고리 속 짐 id
        name: string;
        isChecked: boolean;
        packer: {
          id: string;
          nickname: string;
        } | null;
      }[];
    }[];
  };
}

export interface DeleteTogetherPackingListCategoryInput {
  listId: string;
  categoryId: string;
}
export interface DeleteTogetherPackingListCategoryOutput {
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
    id: string; // 함께 패킹리스트 id
    category: {
      id: string; // 함께 패킹리스트 카테고리 id
      name: string;
      pack: {
        id: string; // 함께 패킹리스트 카테고리 속 짐 id
        name: string;
        isChecked: boolean;
        packer: {
          id: string;
          name: string;
        } | null;
      }[];
    }[];
  };
}

export interface UpdateTogetherPackingListItemInput {
  id: string; // 함께 패킹리스트 짐 id
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
    id: string; // 함께 패킹리스트 id
    category: {
      id: string; // 함께 패킹리스트 카테고리 id
      name: string;
      pack: {
        id: string; // 함께 패킹리스트 짐 id
        name: string;
        isChecked: boolean;
        packer: {
          id: string;
          nickname: string;
        } | null;
      }[];
    }[];
  };
}

export interface DeleteTogetherPackingListItemInput {
  listId: string;
  categoryId: string;
  packId: string;
}

export interface DeleteTogetherPackingListItemOutput {
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

export interface GetTogetherFolderOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    togetherFolder: {
      // 함께 패킹 폴더 배열
      id: string; // 폴더 id
      name: string; // 폴더 이름
    }[];
  };
}

export interface AddTogetherPackingListIntroInput {
  departureDate: string; // 출발 날짜
  folderId: string; // 폴더 id
  title: string; // 함께 패킹리스트 제목
  templateId: string; // 템플릿 id
}

export interface AddTogetherPackingListIntroOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    title: string; // 패킹리스트 제목
    departureDate: string; // 출발 날짜
    togetherPackingList: {
      _id: string; // 함께 패킹리스트 id
      groupId: string; // 그룹 id
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

export interface GetInvitedOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string; // 함께 패킹리스트 id
    title: string; // 함께 패킹리스트 제목
  };
}

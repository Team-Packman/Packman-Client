export interface GetSharedPackingListDetailInput {
  type: 'alone' | 'together';
  inviteCode: string;
}

export interface GetSharedPackingListDetailOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string; // 패킹리스트 id
    title: string; // 패킹리스트 제목
    departureDate: string; // 출발 날짜
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
  };
}

export interface GetHelp {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string; // 엿보기 템플릿 id
    category: {
      // 카테고리
      id: string; // 카테고리 id
      name: string; // 카테고리 이름
      pack: {
        // 짐
        id: string; // 짐 id
        name: string; // 짐 이름
      }[];
    }[];
  };
}

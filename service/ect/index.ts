export interface GetTemplateListOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    basicTemplate: {
      id: string;
      title: string;
    }[];
    myTemplate: {
      id: string;
      title: string;
    }[];
  };
}

export interface GetTemplateOutput {
  status: string;
  success: boolean;
  message: string;
  data: {
    id: string; // 혼자 패킹리스트 id
    title: string; // 혼자 패킹리스트 제목
    departureDate: string; // 혼자 패킹리스트 출발 일시
    category: {
      id: string; // 혼자 패킹리스트 카테고리id
      name: string; // 혼자 패킹리스트 카테고리 이름
      pack: {
        id: string; // 해당 카테고리에 포함된 짐id
        name: string; // 해당 카테고리에 포함된 짐 이름
        isChecked: boolean; // 짐 챙김 여부 챙겼을 경우 true
      }[];
    }[];
    isSaved: false; // 혼자 패킹리스트 나만의 템플릿 추가 여부
  };
}

export interface GetHelpTemplateOutput {
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

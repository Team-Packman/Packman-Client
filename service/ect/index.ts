export interface GetAloneTemplateListOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    basicTemplate: {
      _id: string;
      title: string;
    }[];
    myTemplate: {
      _id: string;
      title: string;
    }[];
  };
}

export interface GetTogetherTemplateListOut {
  status: number;
  success: boolean;
  message: string;
  data: {
    basicTemplate: {
      _id: string;
      title: string;
    }[];
    myTemplate: {
      _id: string;
      title: string;
    }[];
  };
}

export interface GetTemplateOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string; //템플릿 id
    title: string; //템플릿 제목
    category: {
      _id: string; //템플릿 카테고리id
      name: string; //템플릿 카테고리 이름
      pack: {
        _id: string; //해당 카테고리에 포함된 짐id
        name: string; //해당 카테고리에 포함된 짐 이름
      }[];
    }[];
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

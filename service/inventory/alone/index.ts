export interface GetAloneInventoryOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    currentFolder: {
      // 현재 폴더 정보
      _id: string; // 현재 폴더 id
      title: string; // 현재 폴더 이름
    };
    folder: {
      // 폴더 리스트
      _id: string; // 폴더id
      title: string; // 폴더 이름
    }[];
    listNum: number; // 폴더 속 리스트 개수
    alonePackingList: {
      _id: string; // 패킹리스트 아이디
      departureDate: string; // 패킹리스트 출발 일시
      title: string; // 패킹리스트 제목
      packTotalNum: number; // 패킹리스트 총 짐 개수
      packRemainNum: number; // 패킹리스트 남은 짐 개수
    }[];
  };
}
import { GetPackingListWithFoldersOutput } from './../../../../service/packingList/alone/index';
import { AxiosInstance } from 'axios';
export const fetchPackingListWithFolders = async (
  request: AxiosInstance,
): Promise<GetPackingListWithFoldersOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '폴더 속 혼자 패킹리스트 조회 성공',
        data: {
          currentFolder: {
            id: '62bbb80d9d5dc1aa4c3d2831',
            title: '해외여행',
          },
          folder: [
            {
              id: '62bbb80d9d5dc1aa4c3d2831',
              title: '해외여행',
            },
            {
              id: '62bbb80d9d5dc1aa4c3d28323',
              title: '국내여행',
            },
          ],
          listNum: 20,
          alonePackingList: [
            {
              id: '62bbb80d9d5dc1aa4c3d28318',
              departureDate: '2021.08.15',
              title: '혼자 밀라노 여행',
              packTotalNum: 25,
              packRemainNum: 20,
            },
            {
              id: '62bbb80d9d5dc1aa4c3d28329',
              departureDate: '2021.12.20',
              title: '크리스마스 여행',
              packTotalNum: 30,
              packRemainNum: 20,
            },
          ],
        },
      });
    }, 500),
  );
};

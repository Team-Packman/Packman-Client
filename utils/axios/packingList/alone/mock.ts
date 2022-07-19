import {
  GetPackingListWithFoldersOutput,
  GetAlonePackingListDetailOutput,
} from './../../../../service/packingList/alone/index';
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
            title: '혼자여행가기',
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
              id: '62bbb80d9d5dc1aa4c3d28311',
              departureDate: '2021.08.15',
              title: '혼자 밀라노 여행을가자',
              packTotalNum: 25,
              packRemainNum: 20,
            },
            {
              id: '62bbb80d9d5dc1aa4c3d28322',
              departureDate: '2021.12.20',
              title: '크리스마스 여행',
              packTotalNum: 30,
              packRemainNum: 20,
            },
            {
              id: '62bbb80d9d5dc1aa4c3d28323',
              departureDate: '2022.11.06',
              title: '대만 ㄱㄱ',
              packTotalNum: 30,
              packRemainNum: 20,
            },
          ],
        },
      });
    }, 500),
  );
};

export const fetchPackingListDetail = async (
  request: AxiosInstance,
  pacingListId: string,
): Promise<GetAlonePackingListDetailOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '혼자 패킹리스트 상세조회 성공',
        data: {
          _id: '62bbb80d9d5dc1aa4c3d2839',
          title: '혼자 홍콩 한달 살이',
          departureDate: '2022-01-24',
          category: [
            {
              _id: 'cate111',
              name: '필수',
              pack: [
                {
                  _id: 'pack111',
                  name: '여권',
                  isChecked: true,
                  packer: null,
                },
                {
                  _id: 'pack222',
                  name: '가방',
                  isChecked: false,
                  packer: null,
                },
              ],
            },
            {
              _id: 'cate222',
              name: '의류',
              pack: [
                {
                  _id: 'pack333',
                  name: '모자',
                  isChecked: false,
                  packer: null,
                },
                {
                  _id: 'pack444',
                  name: '수영복',
                  isChecked: true,
                  packer: null,
                },
              ],
            },
            {
              _id: 'cate333',
              name: '의류',
              pack: [
                {
                  _id: 'pack555',
                  name: '모자',
                  isChecked: false,
                  packer: null,
                },
                {
                  _id: 'pack666',
                  name: '수영복',
                  isChecked: true,
                  packer: null,
                },
              ],
            },
            {
              _id: 'cate444',
              name: '의류',
              pack: [
                {
                  _id: 'pack777',
                  name: '모자',
                  isChecked: false,
                  packer: null,
                },
                {
                  _id: 'pack888',
                  name: '수영복',
                  isChecked: true,
                  packer: null,
                },
              ],
            },
            {
              _id: 'cate555',
              name: '이것저것',
              pack: [
                {
                  _id: 'pack999',
                  name: '모자',
                  isChecked: false,
                  packer: null,
                },
                {
                  _id: 'pack1010',
                  name: '수영복',
                  isChecked: true,
                  packer: null,
                },
              ],
            },
            {
              _id: 'cate666',
              name: '마지막',
              pack: [
                {
                  _id: 'pack십일십일',
                  name: '모자',
                  isChecked: false,
                  packer: null,
                },
                {
                  _id: 'pack1212',
                  name: '수영복',
                  isChecked: true,
                  packer: null,
                },
              ],
            },
          ],
          isSaved: false,
        },
      });
    }, 500),
  );
};

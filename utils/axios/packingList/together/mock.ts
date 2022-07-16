import { GetTogetherPackingListDeatilOutput } from './../../../../service/packingList/together/index';
import { GetGroupMembersOutput } from '../../../../service/packingList/together/index';
import { AxiosInstance } from 'axios';

export const fetchGroupMember = async (
  request: AxiosInstance,
  groupId: string,
): Promise<GetGroupMembersOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: 'success',
        data: {
          members: [
            {
              // 그룹에 속한 멤버 배열
              id: 'member1', //  멤버 id
              nickname: '세연솜솜', // 멤버 닉네임
              profileImageId: 'img1', // 멤버 프로필 사진 id
            },
            {
              // 그룹에 속한 멤버 배열
              id: 'member2', //  멤버 id
              nickname: '종화딩딩', // 멤버 닉네임
              profileImageId: 'img2', // 멤버 프로필 사진 id
            },
            {
              // 그룹에 속한 멤버 배열
              id: 'member3', //  멤버 id
              nickname: '유나딩딩', // 멤버 닉네임
              profileImageId: 'img3', // 멤버 프로필 사진 id
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
): Promise<GetTogetherPackingListDeatilOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '함께 패킹리스트 상세 조회 성공',
        data: {
          title: '앱잼 합숙',
          groupId: 'group111',
          departureDate: '22.05.05',
          togetherPackingList: {
            id: 'together',
            category: [
              {
                id: 'cate111',
                name: '필수',
                pack: [
                  {
                    id: 'pack111',
                    name: '여권',
                    isChecked: true,
                    packer: {
                      id: 'member2',
                      name: '종화딩딩',
                    },
                  },
                  {
                    id: 'pack222',
                    name: '지갑',
                    isChecked: false,
                    packer: {
                      id: 'member1',
                      name: '세연솜솜',
                    },
                  },
                ],
              },
              {
                id: 'cate222',
                name: '의류랑 약',
                pack: [
                  {
                    id: 'pack333',
                    name: '여권',
                    isChecked: false,
                    packer: null,
                  },
                  {
                    id: 'pack444',
                    name: '여권',
                    isChecked: true,
                    packer: null,
                  },
                ],
              },
              {
                id: 'cate333',
                name: '의류랑 약',
                pack: [
                  {
                    id: 'pack555',
                    name: '여권',
                    isChecked: false,
                    packer: {
                      id: 'member3',
                      name: '유나딩딩',
                    },
                  },
                  {
                    id: 'pack6666',
                    name: '여권',
                    isChecked: true,
                    packer: null,
                  },
                ],
              },
              {
                id: 'cate3123',
                name: '의류랑 약',
                pack: [
                  {
                    id: 'pack333142',
                    name: '여권',
                    isChecked: false,
                    packer: null,
                  },
                  {
                    id: 'pack444753',
                    name: '여권',
                    isChecked: true,
                    packer: null,
                  },
                ],
              },
              {
                id: 'cate31234243',
                name: '의류랑 약',
                pack: [
                  {
                    id: 'pack3335435435142',
                    name: '여권',
                    isChecked: false,
                    packer: null,
                  },
                  {
                    id: 'pack44475123g1jh3',
                    name: '여권',
                    isChecked: true,
                    packer: null,
                  },
                ],
              },
              {
                id: 'cate312d1rtd13',
                name: '의류랑 약',
                pack: [
                  {
                    id: 'pack3331324u3242',
                    name: '여권',
                    isChecked: false,
                    packer: null,
                  },
                  {
                    id: 'pack444k423njkln4753',
                    name: '여권',
                    isChecked: true,
                    packer: null,
                  },
                ],
              },
            ],
          },
          myPackingList: {
            id: '62bbb80d9d5dc1aa4c3cxvbd2839',
            category: [
              {
                id: '62bbb80d9d5dc1aa4c3d2839blm',
                name: '필수',
                pack: [
                  {
                    id: '62bbb80d9d5dc1aa4c3d2839zxcs',
                    name: '여권',
                    isChecked: true,
                    packer: null,
                  },
                ],
              },
            ],
          },
        },
      });
    }, 500),
  );
};

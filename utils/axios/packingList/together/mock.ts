import {
  GetGroupMembersOutput,
  GetTogetherPackingListDetailOutput,
} from '../../../../service/packingList/together/index';
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
              _id: 'member1', //  멤버 _id
              nickname: '세연솜솜', // 멤버 닉네임
              profileImageId: 'img1', // 멤버 프로필 사진 _id
            },
            {
              // 그룹에 속한 멤버 배열
              _id: 'member2', //  멤버 _id
              nickname: '종화딩딩', // 멤버 닉네임
              profileImageId: 'img2', // 멤버 프로필 사진 _id
            },
            {
              // 그룹에 속한 멤버 배열
              _id: 'member3', //  멤버 _id
              nickname: '유나딩딩', // 멤버 닉네임
              profileImageId: 'img3', // 멤버 프로필 사진 _id
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
): Promise<GetTogetherPackingListDetailOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '함께 패킹리스트 상세 조회 성공',
        data: {
          title: '앱잼 합숙',
          departureDate: '2022-05-05',
          group: {
            _id: 's',
            members: [
              {
                _id: 'sad', //  멤버 id
                name: 'd', // 멤버 닉네임
                profileImageId: 'string', // 멤버 프로필 사진 id
              },
            ],
          },
          togetherPackingList: {
            _id: 'together',
            groupId: 'group',
            inviteCode: 'sdfs',
            isSaved: false,
            category: [
              {
                _id: 'cate111',
                name: '필수',
                pack: [
                  {
                    _id: 'pack111',
                    name: '여권',
                    isChecked: true,
                    packer: {
                      _id: 'member2',
                      name: '종화딩딩',
                    },
                  },
                  {
                    _id: 'pack222',
                    name: '지갑',
                    isChecked: false,
                    packer: {
                      _id: 'member1',
                      name: '세연솜솜',
                    },
                  },
                ],
              },
              {
                _id: 'cate222',
                name: '의류랑 약',
                pack: [
                  {
                    _id: 'pack333',
                    name: '여권',
                    isChecked: false,
                    packer: null,
                  },
                  {
                    _id: 'pack444',
                    name: '여권',
                    isChecked: true,
                    packer: null,
                  },
                ],
              },
              {
                _id: 'cate333',
                name: '의류랑 약',
                pack: [
                  {
                    _id: 'pack555',
                    name: '여권',
                    isChecked: false,
                    packer: {
                      _id: 'member3',
                      name: '유나딩딩',
                    },
                  },
                  {
                    _id: 'pack6666',
                    name: '여권',
                    isChecked: true,
                    packer: null,
                  },
                ],
              },
              {
                _id: 'cate3123',
                name: '의류랑 약',
                pack: [
                  {
                    _id: 'pack333142',
                    name: '여권',
                    isChecked: false,
                    packer: null,
                  },
                  {
                    _id: 'pack444753',
                    name: '여권',
                    isChecked: true,
                    packer: null,
                  },
                ],
              },
              {
                _id: 'cate31234243',
                name: '의류랑 약',
                pack: [
                  {
                    _id: 'pack3335435435142',
                    name: '여권',
                    isChecked: false,
                    packer: null,
                  },
                  {
                    _id: 'pack44475123g1jh3',
                    name: '여권',
                    isChecked: true,
                    packer: null,
                  },
                ],
              },
              {
                _id: 'cate312d1rtd13',
                name: '마지막',
                pack: [
                  {
                    _id: 'pack3331324u3242',
                    name: '여권',
                    isChecked: false,
                    packer: null,
                  },
                  {
                    _id: 'pack444k423njkln4753',
                    name: '여권',
                    isChecked: true,
                    packer: null,
                  },
                ],
              },
            ],
          },
          myPackingList: {
            _id: '62bbb80d9d5dc1aa4c3cxvbd2839',
            category: [
              {
                _id: '62bbb80d9d5dc1aa4c3d2839blm',
                name: '필수',
                pack: [
                  {
                    _id: '62bbb80d9d5dc1aa4c3d2839zxcs',
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

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
          id: '5',
          title: '단체 해외여행',
          folderId: '1',
          departureDate: '2022.12.22',
          togetherPackingList: {
            id: '13',
            groupId: '6',
            category: [
              {
                id: '16',
                name: '의류',
                pack: [
                  {
                    id: '10',
                    name: '하의',
                    isChecked: false,
                    packer: {
                      id: '3',
                      nickname: '딩딩',
                    },
                  },
                ],
              },
            ],
            inviteCode: 'KdctV',
            isSaved: false,
          },
          myPackingList: {
            id: '14',
            category: [
              {
                id: '15',
                name: '기본',
                pack: [],
              },
            ],
          },
          group: {
            id: '6',
            member: [
              {
                id: '3',
                nickname: '딩딩',
                profileImage: '2',
              },
            ],
          },
          isMember: true,
        },
      });
    }, 500),
  );
};

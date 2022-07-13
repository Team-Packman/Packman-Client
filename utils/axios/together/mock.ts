import { GroupMembersOutput } from './../../../service/together/index';
import { AxiosInstance } from 'axios';

export const fetchGroupMember = async (
  request: AxiosInstance,
  groupId: string,
): Promise<GroupMembersOutput> => {
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
              id: '1', //  멤버 id
              nickname: 'seyeon', // 멤버 닉네임
              profileImageId: '2', // 멤버 프로필 사진 id
            },
          ],
        },
      });
    }, 500),
  );
};

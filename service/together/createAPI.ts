import { AxiosInstance } from 'axios';
import { GroupMembersOutput, TogetherPackingListOutput } from './index';
import withAuth from '../../utils/axios/withAuth';
import { fetchGroupMember, fetchTogetherPackingList } from '../../utils/axios/together';

export interface TogetherAPI {
  getGroupMembers: (groupId: string) => Promise<GroupMembersOutput>;
  getTogetherPackingList: (folderId: string) => Promise<TogetherPackingListOutput>;
}

export const createTogetherAPI = (request: AxiosInstance): TogetherAPI => {
  return {
    getGroupMembers: (groupId: string) => fetchGroupMember(withAuth(request), groupId),
    getTogetherPackingList: (folderId: string) =>
      fetchTogetherPackingList(withAuth(request), folderId),
  };
};

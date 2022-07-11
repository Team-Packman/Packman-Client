import { AxiosInstance } from 'axios';
import { GroupMembersOutput } from './index';
import withAuth from '../../utils/axios/withAuth';
import { fetchGroupMember } from '../../utils/axios/together';

export interface TogetherAPI {
  getGroupMembers: (groupId: string) => Promise<GroupMembersOutput>;
}

export const createTogetherAPI = (request: AxiosInstance): TogetherAPI => {
  return {
    getGroupMembers: (groupId: string) => fetchGroupMember(withAuth(request), groupId),
  };
};

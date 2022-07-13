import { AxiosInstance } from 'axios';
import { GroupMembersOutput } from './index';
import withAuth from '../../utils/axios/withAuth';
import { fetchGroupMember } from '../../utils/axios/packingList/together/mock';

export interface TogetherAPI {
  together: { getGroupMembers: (groupId: string) => Promise<GroupMembersOutput> };
}

export const createTogetherAPI = (request: AxiosInstance): TogetherAPI => {
  return {
    together: {
      getGroupMembers: (groupId: string) => fetchGroupMember(withAuth(request), groupId),
    },
  };
};

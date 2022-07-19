import { AxiosInstance } from 'axios';
import { GetGroupMembersOutput, GetTogetherPackingListDeatilOutput } from './index';
import withAuth from '../../../utils/axios/withAuth';
import {
  fetchGroupMember,
  fetchPackingListDetail,
} from '../../../utils/axios/packingList/together/mock';

export interface TogetherAPI {
  together: {
    getGroupMembers: (groupId: string) => Promise<GetGroupMembersOutput>;
    getPackingListDeatil: (pacingListId: string) => Promise<GetTogetherPackingListDeatilOutput>;
  };
}

export const createTogetherAPI = (request: AxiosInstance): TogetherAPI => {
  return {
    together: {
      getGroupMembers: (groupId: string) => fetchGroupMember(withAuth(request), groupId),
      getPackingListDeatil: (pacingListId: string) =>
        fetchPackingListDetail(withAuth(request), pacingListId),
    },
  };
};

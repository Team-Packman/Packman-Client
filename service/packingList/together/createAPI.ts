import { fetchPackingListDetail } from './../../../utils/axios/packingList/together/index';
import { AxiosInstance } from 'axios';
import {
  GroupMembersOutput,
  TogetherPackingListOutput,
  GetTogetherPackingListDeatilOutput,
} from './index';
import withAuth from '../../../utils/axios/withAuth';
import { fetchGroupMember } from '../../../utils/axios/packingList/together';

export interface TogetherAPI {
  getGroupMembers: (groupId: string) => Promise<GroupMembersOutput>;
  getPackingListDeatil: (pacingListId: string) => Promise<GetTogetherPackingListDeatilOutput>;
}

export const createTogetherAPI = (request: AxiosInstance): TogetherAPI => {
  return {
    getGroupMembers: (groupId: string) => fetchGroupMember(withAuth(request), groupId),
    getPackingListDeatil: (pacingListId: string) =>
      fetchPackingListDetail(withAuth(request), pacingListId),
  };
};

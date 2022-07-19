import { GetTogetherPackingListDeatilOutput } from './../../../../service/packingList/together/index';
import { GroupMembersOutput } from '../../../../service/packingList/together/index';
import { AxiosInstance } from 'axios';

export const fetchGroupMember = async (
  request: AxiosInstance,
  groupId: string,
): Promise<GroupMembersOutput> => {
  const { data } = await request(`/together/member/${groupId}`);
  return data;
};

export const fetchPackingListDetail = async (
  request: AxiosInstance,
  pacingListId: string,
): Promise<GetTogetherPackingListDeatilOutput> => {
  const { data } = await request(`/together/${pacingListId}`);
  return data;
};

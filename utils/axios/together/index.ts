import { GroupMembersOutput } from './../../../service/together/index';
import { AxiosInstance } from 'axios';

export const fetchGroupMember = async (
  request: AxiosInstance,
  groupId: string,
): Promise<GroupMembersOutput> => {
  const { data } = await request(`/together/member/${groupId}`);
  return data;
};

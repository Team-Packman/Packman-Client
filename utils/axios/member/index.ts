import { GetGroupMemberInput, GetGroupMemberOutput } from './../../../service/member/index';
import { AxiosInstance } from 'axios';

export const fetchGroupMember = async (
  request: AxiosInstance,
  { listId }: GetGroupMemberInput,
): Promise<GetGroupMemberOutput> => {
  const { data } = await request(`/member/${listId}`);
  return data;
};

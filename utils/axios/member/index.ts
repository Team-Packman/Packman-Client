import {
  GetGroupMemberInput,
  GetGroupMemberOutput,
  DeleteGroupMemberOutput,
  DeleteGroupMemberInput,
} from './../../../service/member/index';
import { AxiosInstance } from 'axios';

export const fetchGroupMember = async (
  request: AxiosInstance,
  { listId }: GetGroupMemberInput,
): Promise<GetGroupMemberOutput> => {
  const { data } = await request(`/member/${listId}`);
  return data;
};

export const deleteGroupMember = async (
  request: AxiosInstance,
  { groupId, userId }: DeleteGroupMemberInput,
): Promise<DeleteGroupMemberOutput> => {
  const { data } = await request.delete(`/member/${groupId}/${userId}`);
  return data;
};

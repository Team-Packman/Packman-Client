import { client } from '..';
import {
  GetGroupMemberInput,
  GetGroupMemberOutput,
  DeleteGroupMemberOutput,
  DeleteGroupMemberInput,
} from './../../../service/member/index';

export const fetchGroupMember = async ({
  listId,
}: GetGroupMemberInput): Promise<GetGroupMemberOutput> => {
  const { data } = await client(`/member/${listId}`);
  return data;
};

export const deleteGroupMember = async ({
  groupId,
  userId,
}: DeleteGroupMemberInput): Promise<DeleteGroupMemberOutput> => {
  const { data } = await client.delete(`/member/${groupId}/${userId}`);
  return data;
};

import {
  GetTogetherPackingListDetailOutput,
  AddTogetherPackingListCategoryInput,
  AddTogetherPackingListCategoryOutput,
  UpdateTogetherPackingListCategoryInput,
  UpdateTogetherPackingListCategoryOutput,
  AddTogetherPackingListItemInput,
  AddTogetherPackingListItemOutput,
  UpdateTogetherPackingListItemInput,
  UpdateTogetherPackingListItemOutput,
  UpdatePackingListTitleInput,
  UpdatePackingListTitleOutput,
  UpdatePackingListDateInput,
  UpdatePackingListDateOutput,
  UpdatePackingListIsSavedInput,
  UpdatePackingListIsSavedOutput,
  UpdatePackingListPackerInput,
  UpdatePackingListPackerOutput,
  DeleteTogetherPackingListCategoryInput,
  DeleteTogetherPackingListCategoryOutput,
  DeleteTogetherPackingListItemInput,
  DeleteTogetherPackingListItemOutput,
  GetTogetherFolderOutput,
  AddTogetherPackingListIntroInput,
  AddTogetherPackingListIntroOutput,
  GetInvitedOutput,
  AddMemberInput,
  AddMemberOutput,
} from './../../../../service/packingList/together/index';
import { GetGroupMembersOutput } from '../../../../service/packingList/together/index';
import { client } from '../..';

export const fetchUpdatePackingListTitle = async (
  payload: UpdatePackingListTitleInput,
): Promise<UpdatePackingListTitleOutput> => {
  const { data } = await client.patch(`/list/title`, payload);
  return data;
};

export const fetchUpdatePackingListDate = async (
  payload: UpdatePackingListDateInput,
): Promise<UpdatePackingListDateOutput> => {
  const { data } = await client.patch(`/list/departureDate`, payload);
  return data;
};

export const fetchUpdatePackingListIsSaved = async (
  payload: UpdatePackingListIsSavedInput,
): Promise<UpdatePackingListIsSavedOutput> => {
  const { data } = await client.patch(`/list/myTemplate`, payload);
  return data;
};

export const fetchUpdatePackingListPacker = async (
  payload: UpdatePackingListPackerInput,
): Promise<UpdatePackingListPackerOutput> => {
  const { data } = await client.patch(`/list/together/packer`, payload);
  return data;
};

export const fetchGroupMember = async (groupId: string): Promise<GetGroupMembersOutput> => {
  const { data } = await client(`/together/member/${groupId}`);
  return data;
};

export const fetchPackingListDetail = async (
  listId: string,
): Promise<GetTogetherPackingListDetailOutput> => {
  const { data } = await client(`/list/together/${listId}`);
  return data;
};

export const fetchAddPackingListCategory = async (
  payload: AddTogetherPackingListCategoryInput,
): Promise<AddTogetherPackingListCategoryOutput> => {
  const { data } = await client.post(`/list/together/category`, payload);
  return data;
};

export const fetchUpdatePackingListCategory = async (
  payload: UpdateTogetherPackingListCategoryInput,
): Promise<UpdateTogetherPackingListCategoryOutput> => {
  const { data } = await client.patch(`/list/together/category`, payload);
  return data;
};

export const fetchDeletePackingListCategory = async ({
  listId,
  categoryId,
}: DeleteTogetherPackingListCategoryInput): Promise<DeleteTogetherPackingListCategoryOutput> => {
  const { data } = await client.delete(`/list/together/category/${listId}/${categoryId}`);
  return data;
};

export const fetchAddPackingListItem = async (
  payload: AddTogetherPackingListItemInput,
): Promise<AddTogetherPackingListItemOutput> => {
  const { data } = await client.post(`/list/together/pack`, payload);
  return data;
};

export const fetchUpdatePackingListItem = async (
  payload: UpdateTogetherPackingListItemInput,
): Promise<UpdateTogetherPackingListItemOutput> => {
  const { data } = await client.patch(`/list/together/pack`, payload);
  return data;
};

export const fetchDeletePackingListItem = async ({
  listId,
  categoryId,
  packId,
}: DeleteTogetherPackingListItemInput): Promise<DeleteTogetherPackingListItemOutput> => {
  const { data } = await client.delete(`/list/together/pack/${listId}/${categoryId}/${packId}`);
  return data;
};

export const fetchTogetherFolder = async (): Promise<GetTogetherFolderOutput> => {
  const { data } = await client(`/folder/together`);
  return data;
};

export const fetchAddTogetherPackingFolder = async (
  payload: AddTogetherPackingListIntroInput,
): Promise<AddTogetherPackingListIntroOutput> => {
  const { data } = await client.post(`/list/together`, payload);
  return data;
};

export const fetchInvited = async (inviteCode: string): Promise<GetInvitedOutput> => {
  const { data } = await client(`/list/together/invite/${inviteCode}`);
  return data;
};

export const fetchAddMember = async (payload: AddMemberInput): Promise<AddMemberOutput> => {
  const { data } = await client.post(`/list/together/add-member`, payload);
  return data;
};

import { GetAloneInvitedOutput } from './../../../../service/packingList/alone/index';
import {
  AddAlonePackingListIntroOutput,
  AddAlonePackingListIntroInput,
  GetAloneFolderOutput,
  AddAlonePackingListCategoryInput,
  AddAlonePackingListCategoryOutput,
  UpdateAlonePackingListCategoryInput,
  UpdateAlonePackingListCategoryOutput,
  DeleteAlonePackingListCategoryInput,
  DeleteAlonePackingListCategoryOutput,
  AddAlonePackingListItemInput,
  AddAlonePackingListItemOutput,
  UpdateAlonePackingListItemOutput,
  UpdateAlonePackingListItemInput,
  DeleteAlonePackingListItemInput,
  DeleteAlonePackingListItemOutput,
  GetAlonePackingListDetailOutput,
} from '../../../../service/packingList/alone';
import { client } from '../..';

export const fetchAloneFolder = async (): Promise<GetAloneFolderOutput> => {
  const { data } = await client(`/folder/alone`);
  return data;
};

export const fetchAddAlonePackingFolder = async (
  payload: AddAlonePackingListIntroInput,
): Promise<AddAlonePackingListIntroOutput> => {
  const { data } = await client.post(`/list/alone`, payload);
  return data;
};

export const fetchAddAlonePackingCategory = async (
  payload: AddAlonePackingListCategoryInput,
): Promise<AddAlonePackingListCategoryOutput> => {
  const { data } = await client.post(`/list/alone/category`, payload);
  return data;
};

export const fetchUpdateAlonePackingCategory = async (
  payload: UpdateAlonePackingListCategoryInput,
): Promise<UpdateAlonePackingListCategoryOutput> => {
  const { data } = await client.patch(`/list/alone/category`, payload);
  return data;
};

export const fetchDeleteAlonePackingCategory = async ({
  listId,
  categoryId,
}: DeleteAlonePackingListCategoryInput): Promise<DeleteAlonePackingListCategoryOutput> => {
  const { data } = await client.delete(`/list/alone/category/${listId}/${categoryId}`);
  return data;
};

export const fetchAddAlonePackingItem = async (
  payload: AddAlonePackingListItemInput,
): Promise<AddAlonePackingListItemOutput> => {
  const { data } = await client.post(`/list/alone/pack`, payload);
  return data;
};

export const fetchUpdateAlonePackingItem = async (
  payload: UpdateAlonePackingListItemInput,
): Promise<UpdateAlonePackingListItemOutput> => {
  const { data } = await client.patch(`/list/alone/pack`, payload);
  return data;
};

export const fetchDeleteAlonePackingItem = async ({
  listId,
  categoryId,
  packId,
}: DeleteAlonePackingListItemInput): Promise<DeleteAlonePackingListItemOutput> => {
  const { data } = await client.delete(`/list/alone/pack/${listId}/${categoryId}/${packId}`);
  return data;
};

export const fetchAlonePackingListDetail = async (
  listId: string,
): Promise<GetAlonePackingListDetailOutput> => {
  const { data } = await client(`/list/alone/${listId}`);
  return data;
};

export const fetchAloneInvited = async (inviteCode: string): Promise<GetAloneInvitedOutput> => {
  const { data } = await client(`/list/alone/invite/${inviteCode}`);
  return data;
};

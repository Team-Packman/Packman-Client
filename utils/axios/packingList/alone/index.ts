import { AxiosInstance } from 'axios';
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

export const fetchAloneFolder = async (request: AxiosInstance): Promise<GetAloneFolderOutput> => {
  const { data } = await request(`/folder/alone`);
  return data;
};

export const fetchAddAlonePackingFolder = async (
  request: AxiosInstance,
  payload: AddAlonePackingListIntroInput,
): Promise<AddAlonePackingListIntroOutput> => {
  const { data } = await request.post(`/packingList/alone`, payload);
  return data;
};

export const fetchAddAlonePackingCategory = async (
  request: AxiosInstance,
  payload: AddAlonePackingListCategoryInput,
): Promise<AddAlonePackingListCategoryOutput> => {
  const { data } = await request.post(`/list/alone/category`, payload);
  return data;
};

export const fetchUpdateAlonePackingCategory = async (
  request: AxiosInstance,
  payload: UpdateAlonePackingListCategoryInput,
): Promise<UpdateAlonePackingListCategoryOutput> => {
  const { data } = await request.patch(`/list/alone/category`, payload);
  return data;
};

export const fetchDeleteAlonePackingCategory = async (
  request: AxiosInstance,
  { listId, categoryId }: DeleteAlonePackingListCategoryInput,
): Promise<DeleteAlonePackingListCategoryOutput> => {
  const { data } = await request.delete(`/list/alone/category/${listId}/${categoryId}`);
  return data;
};

export const fetchAddAlonePackingItem = async (
  request: AxiosInstance,
  payload: AddAlonePackingListItemInput,
): Promise<AddAlonePackingListItemOutput> => {
  const { data } = await request.post(`/list/alone/pack`, payload);
  return data;
};

export const fetchUpdateAlonePackingItem = async (
  request: AxiosInstance,
  payload: UpdateAlonePackingListItemInput,
): Promise<UpdateAlonePackingListItemOutput> => {
  const { data } = await request.patch(`/list/alone/pack`, payload);
  return data;
};

export const fetchDeleteAlonePackingItem = async (
  request: AxiosInstance,
  { listId, categoryId, packId }: DeleteAlonePackingListItemInput,
): Promise<DeleteAlonePackingListItemOutput> => {
  const { data } = await request.delete(`/list/alone/pack/${listId}/${categoryId}/${packId}`);
  return data;
};

export const fetchAlonePackingListDetail = async (
  request: AxiosInstance,
  listId: string,
): Promise<GetAlonePackingListDetailOutput> => {
  const { data } = await request(`/list/alone/${listId}`);
  return data;
};

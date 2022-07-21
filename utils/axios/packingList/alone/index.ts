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
  const { data } = await request.post(`/packingList/alone/category`, payload);
  return data;
};

export const fetchUpdateAlonePackingCategory = async (
  request: AxiosInstance,
  payload: UpdateAlonePackingListCategoryInput,
): Promise<UpdateAlonePackingListCategoryOutput> => {
  const { data } = await request.patch(`/packingList/alone/category`, payload);
  return data;
};

export const fetchDeleteAlonePackingCategory = async (
  request: AxiosInstance,
  { listId, categoryId }: DeleteAlonePackingListCategoryInput,
): Promise<DeleteAlonePackingListCategoryOutput> => {
  const { data } = await request.delete(`/packingList/alone/category/${listId}/${categoryId}`);
  return data;
};

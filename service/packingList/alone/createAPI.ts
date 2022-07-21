import { AxiosInstance } from 'axios';
import {
  AddAlonePackingListIntroOutput,
  AddAlonePackingListIntroInput,
  GetAloneFolderOutput,
  AddAlonePackingListCategoryOutput,
  AddAlonePackingListCategoryInput,
  UpdateAlonePackingListCategoryInput,
  UpdateAlonePackingListCategoryOutput,
  DeleteAlonePackingListCategoryInput,
  DeleteAlonePackingListCategoryOutput,
  AddAlonePackingListItemInput,
  AddAlonePackingListItemOutput,
  UpdateAlonePackingListItemInput,
  UpdateAlonePackingListItemOutput,
  DeleteAlonePackingListItemInput,
  DeleteAlonePackingListItemOutput,
} from './index';
import {
  fetchAddAlonePackingCategory,
  fetchAddAlonePackingFolder,
  fetchAddAlonePackingItem,
  fetchAloneFolder,
  fetchDeleteAlonePackingCategory,
  fetchDeleteAlonePackingItem,
  fetchUpdateAlonePackingCategory,
  fetchUpdateAlonePackingItem,
} from '../../../utils/axios/packingList/alone';
import withAuth from '../../../utils/axios/withAuth';

export interface AloneAPI {
  alone: {
    getAloneFolder: () => Promise<GetAloneFolderOutput>;
    addAlonePackingListFolder: (
      payload: AddAlonePackingListIntroInput,
    ) => Promise<AddAlonePackingListIntroOutput>;
    addAlonePackingListCategory: (
      payload: AddAlonePackingListCategoryInput,
    ) => Promise<AddAlonePackingListCategoryOutput>;
    updateAlonePackingListCategory: (
      payload: UpdateAlonePackingListCategoryInput,
    ) => Promise<UpdateAlonePackingListCategoryOutput>;
    deleteAlonePackingListCategory: (
      payload: DeleteAlonePackingListCategoryInput,
    ) => Promise<DeleteAlonePackingListCategoryOutput>;
    addAlonePackingListItem: (
      payload: AddAlonePackingListItemInput,
    ) => Promise<AddAlonePackingListItemOutput>;
    updateAlonePackingListItem: (
      payload: UpdateAlonePackingListItemInput,
    ) => Promise<UpdateAlonePackingListItemOutput>;
    deleteAlonePackingListItem: (
      payload: DeleteAlonePackingListItemInput,
    ) => Promise<DeleteAlonePackingListItemOutput>;
  };
}

export const createAloneAPI = (request: AxiosInstance): AloneAPI => {
  return {
    alone: {
      getAloneFolder: () => fetchAloneFolder(withAuth(request)),
      addAlonePackingListFolder: (payload: AddAlonePackingListIntroInput) =>
        fetchAddAlonePackingFolder(withAuth(request), payload),
      addAlonePackingListCategory: (payload: AddAlonePackingListCategoryInput) =>
        fetchAddAlonePackingCategory(withAuth(request), payload),
      updateAlonePackingListCategory: (payload: UpdateAlonePackingListCategoryInput) =>
        fetchUpdateAlonePackingCategory(withAuth(request), payload),
      deleteAlonePackingListCategory: (payload: DeleteAlonePackingListCategoryInput) =>
        fetchDeleteAlonePackingCategory(withAuth(request), payload),
      addAlonePackingListItem: (payload: AddAlonePackingListItemInput) =>
        fetchAddAlonePackingItem(withAuth(request), payload),
      updateAlonePackingListItem: (payload: UpdateAlonePackingListItemInput) =>
        fetchUpdateAlonePackingItem(withAuth(request), payload),
      deleteAlonePackingListItem: (payload: DeleteAlonePackingListItemInput) =>
        fetchDeleteAlonePackingItem(withAuth(request), payload),
    },
  };
};

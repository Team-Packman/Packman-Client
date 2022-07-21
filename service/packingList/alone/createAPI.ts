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
} from './index';
import {
  fetchAddAlonePackingCategory,
  fetchAddAlonePackingFolder,
  fetchAloneFolder,
  fetchDeleteAlonePackingCategory,
  fetchUpdateAlonePackingCategory,
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
    },
  };
};

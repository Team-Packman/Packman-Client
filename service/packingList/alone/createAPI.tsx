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
  GetAlonePackingListDetailOutput,
} from './index';
import {
  fetchAddAlonePackingCategory,
  fetchAddAlonePackingFolder,
  fetchAddAlonePackingItem,
  fetchAloneFolder,
  fetchAlonePackingListDetail,
  fetchDeleteAlonePackingCategory,
  fetchDeleteAlonePackingItem,
  fetchUpdateAlonePackingCategory,
  fetchUpdateAlonePackingItem,
} from '../../../utils/axios/packingList/alone';

export interface AloneAPI {
  alone: {
    getAloneFolder: () => Promise<GetAloneFolderOutput>;
    getAlonePackingListDetail: (listId: string) => Promise<GetAlonePackingListDetailOutput>;
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

const createAloneAPI = (request: AxiosInstance): AloneAPI => {
  return {
    alone: {
      getAloneFolder: () => fetchAloneFolder(request),
      getAlonePackingListDetail: (listId: string) => fetchAlonePackingListDetail(request, listId),
      addAlonePackingListFolder: (payload: AddAlonePackingListIntroInput) =>
        fetchAddAlonePackingFolder(request, payload),
      addAlonePackingListCategory: (payload: AddAlonePackingListCategoryInput) =>
        fetchAddAlonePackingCategory(request, payload),
      updateAlonePackingListCategory: (payload: UpdateAlonePackingListCategoryInput) =>
        fetchUpdateAlonePackingCategory(request, payload),
      deleteAlonePackingListCategory: (payload: DeleteAlonePackingListCategoryInput) =>
        fetchDeleteAlonePackingCategory(request, payload),
      addAlonePackingListItem: (payload: AddAlonePackingListItemInput) =>
        fetchAddAlonePackingItem(request, payload),
      updateAlonePackingListItem: (payload: UpdateAlonePackingListItemInput) =>
        fetchUpdateAlonePackingItem(request, payload),
      deleteAlonePackingListItem: (payload: DeleteAlonePackingListItemInput) =>
        fetchDeleteAlonePackingItem(request, payload),
    },
  };
};

export default createAloneAPI;

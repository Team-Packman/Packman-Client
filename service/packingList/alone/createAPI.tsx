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
import withAuth from '../../../utils/axios/withAuth';

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
  const authReq = request;
  return {
    alone: {
      getAloneFolder: () => fetchAloneFolder(authReq),
      getAlonePackingListDetail: (listId: string) => fetchAlonePackingListDetail(authReq, listId),
      addAlonePackingListFolder: (payload: AddAlonePackingListIntroInput) =>
        fetchAddAlonePackingFolder(authReq, payload),
      addAlonePackingListCategory: (payload: AddAlonePackingListCategoryInput) =>
        fetchAddAlonePackingCategory(authReq, payload),
      updateAlonePackingListCategory: (payload: UpdateAlonePackingListCategoryInput) =>
        fetchUpdateAlonePackingCategory(authReq, payload),
      deleteAlonePackingListCategory: (payload: DeleteAlonePackingListCategoryInput) =>
        fetchDeleteAlonePackingCategory(authReq, payload),
      addAlonePackingListItem: (payload: AddAlonePackingListItemInput) =>
        fetchAddAlonePackingItem(authReq, payload),
      updateAlonePackingListItem: (payload: UpdateAlonePackingListItemInput) =>
        fetchUpdateAlonePackingItem(authReq, payload),
      deleteAlonePackingListItem: (payload: DeleteAlonePackingListItemInput) =>
        fetchDeleteAlonePackingItem(authReq, payload),
    },
  };
};

export default createAloneAPI;

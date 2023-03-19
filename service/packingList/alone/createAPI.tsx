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
  GetAloneInvitedOutput,
} from './index';
import {
  fetchAddAlonePackingCategory,
  fetchAddAlonePackingFolder,
  fetchAddAlonePackingItem,
  fetchAloneFolder,
  fetchAloneInvited,
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
    getInvited: (invitedCode: string) => Promise<GetAloneInvitedOutput>;
  };
}

const createAloneAPI = (): AloneAPI => {
  return {
    alone: {
      getAloneFolder: () => fetchAloneFolder(),
      getAlonePackingListDetail: (listId: string) => fetchAlonePackingListDetail(listId),
      addAlonePackingListFolder: (payload: AddAlonePackingListIntroInput) =>
        fetchAddAlonePackingFolder(payload),
      addAlonePackingListCategory: (payload: AddAlonePackingListCategoryInput) =>
        fetchAddAlonePackingCategory(payload),
      updateAlonePackingListCategory: (payload: UpdateAlonePackingListCategoryInput) =>
        fetchUpdateAlonePackingCategory(payload),
      deleteAlonePackingListCategory: (payload: DeleteAlonePackingListCategoryInput) =>
        fetchDeleteAlonePackingCategory(payload),
      addAlonePackingListItem: (payload: AddAlonePackingListItemInput) =>
        fetchAddAlonePackingItem(payload),
      updateAlonePackingListItem: (payload: UpdateAlonePackingListItemInput) =>
        fetchUpdateAlonePackingItem(payload),
      deleteAlonePackingListItem: (payload: DeleteAlonePackingListItemInput) =>
        fetchDeleteAlonePackingItem(payload),
      getInvited: (invitedCode: string) => fetchAloneInvited(invitedCode),
    },
  };
};

export default createAloneAPI;

import {
  fetchPackingListDetail,
  fetchAddPackingListCategory,
  fetchAddPackingListItem,
  fetchUpdatePackingListItem,
  fetchUpdatePackingListTitle,
  fetchUpdatePackingListCategory,
  fetchUpdatePackingListDate,
  fetchUpdatePackingListIsSaved,
  fetchUpdatePackingListPacker,
  fetchDeletePackingListCategory,
  fetchDeletePackingListItem,
  fetchTogetherFolder,
  fetchAddTogetherPackingFolder,
} from './../../../utils/axios/packingList/together/index';
import { AxiosInstance } from 'axios';
import {
  GetGroupMembersOutput,
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
  UpdatePackingListIsSavedOutput,
  UpdatePackingListIsSavedInput,
  UpdatePackingListPackerInput,
  UpdatePackingListPackerOutput,
  DeleteTogetherPackingListCategoryOutput,
  DeleteTogetherPackingListCategoryInput,
  DeleteTogetherPackingListItemInput,
  DeleteTogetherPackingListItemOutput,
  GetTogetherFolderOutput,
  AddTogetherPackingListIntroInput,
  AddTogetherPackingListIntroOutput,
} from './index';
import withAuth from '../../../utils/axios/withAuth';
import { fetchGroupMember } from '../../../utils/axios/packingList/together';

export interface TogetherAPI {
  together: {
    updatePackingListTitle: (
      payload: UpdatePackingListTitleInput,
    ) => Promise<UpdatePackingListTitleOutput>;
    updatePackingListDate: (
      payload: UpdatePackingListDateInput,
    ) => Promise<UpdatePackingListDateOutput>;
    updatePackingListIsSaved: (
      payload: UpdatePackingListIsSavedInput,
    ) => Promise<UpdatePackingListIsSavedOutput>;
    updatePackingListPacker: (
      payload: UpdatePackingListPackerInput,
    ) => Promise<UpdatePackingListPackerOutput>;
    getGroupMembers: (groupId: string) => Promise<GetGroupMembersOutput>;
    getPackingListDeatil: (
      pacingListId: string,
      inviteCode?: string,
    ) => Promise<GetTogetherPackingListDetailOutput>;
    addPackingListCategory: (
      payload: AddTogetherPackingListCategoryInput,
    ) => Promise<AddTogetherPackingListCategoryOutput>;
    updatePackingListCategory: (
      payload: UpdateTogetherPackingListCategoryInput,
    ) => Promise<UpdateTogetherPackingListCategoryOutput>;
    deletePackingListCategory: (
      payload: DeleteTogetherPackingListCategoryInput,
    ) => Promise<DeleteTogetherPackingListCategoryOutput>;
    addPackingListItem: (
      payload: AddTogetherPackingListItemInput,
    ) => Promise<AddTogetherPackingListItemOutput>;
    updatePackingListItem: (
      payload: UpdateTogetherPackingListItemInput,
    ) => Promise<UpdateTogetherPackingListItemOutput>;
    deletePackingListItem: (
      payload: DeleteTogetherPackingListItemInput,
    ) => Promise<DeleteTogetherPackingListItemOutput>;
    getTogetherFolder: () => Promise<GetTogetherFolderOutput>;
    addTogetherPakingListFolder: (
      payload: AddTogetherPackingListIntroInput,
    ) => Promise<AddTogetherPackingListIntroOutput>;
  };
}

export const createTogetherAPI = (request: AxiosInstance): TogetherAPI => {
  return {
    together: {
      updatePackingListTitle: (payload: UpdatePackingListTitleInput) =>
        fetchUpdatePackingListTitle(withAuth(request), payload),
      updatePackingListDate: (payload: UpdatePackingListDateInput) =>
        fetchUpdatePackingListDate(withAuth(request), payload),
      updatePackingListIsSaved: (payload: UpdatePackingListIsSavedInput) =>
        fetchUpdatePackingListIsSaved(withAuth(request), payload),
      updatePackingListPacker: (payload: UpdatePackingListPackerInput) =>
        fetchUpdatePackingListPacker(withAuth(request), payload),
      getGroupMembers: (groupId: string) => fetchGroupMember(withAuth(request), groupId),
      getPackingListDeatil: (pacingListId: string, inviteCode?: string) =>
        fetchPackingListDetail(withAuth(request), pacingListId, inviteCode),
      addPackingListCategory: (payload: AddTogetherPackingListCategoryInput) =>
        fetchAddPackingListCategory(withAuth(request), payload),
      updatePackingListCategory: (payload: UpdateTogetherPackingListCategoryInput) =>
        fetchUpdatePackingListCategory(withAuth(request), payload),
      deletePackingListCategory: (payload: DeleteTogetherPackingListCategoryInput) =>
        fetchDeletePackingListCategory(withAuth(request), payload),
      addPackingListItem: (payload: AddTogetherPackingListItemInput) =>
        fetchAddPackingListItem(withAuth(request), payload),
      updatePackingListItem: (payload: UpdateTogetherPackingListItemInput) =>
        fetchUpdatePackingListItem(withAuth(request), payload),
      deletePackingListItem: (payload: DeleteTogetherPackingListItemInput) =>
        fetchDeletePackingListItem(withAuth(request), payload),
      getTogetherFolder: () => fetchTogetherFolder(withAuth(request)),
      addTogetherPakingListFolder: (payload: AddTogetherPackingListIntroInput) =>
        fetchAddTogetherPackingFolder(withAuth(request), payload),
    },
  };
};

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
  fetchInvited,
} from '../../../utils/axios/packingList/together/index';
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
  GetInvitedOutput,
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
    getPackingListDetail: (
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
    addTogetherPackingListFolder: (
      payload: AddTogetherPackingListIntroInput,
    ) => Promise<AddTogetherPackingListIntroOutput>;
    getInvited: (inviteCode: string) => Promise<GetInvitedOutput>;
  };
}

const createTogetherAPI = (request: AxiosInstance): TogetherAPI => {
  return {
    together: {
      updatePackingListTitle: (payload: UpdatePackingListTitleInput) =>
        fetchUpdatePackingListTitle(request, payload),
      updatePackingListDate: (payload: UpdatePackingListDateInput) =>
        fetchUpdatePackingListDate(request, payload),
      updatePackingListIsSaved: (payload: UpdatePackingListIsSavedInput) =>
        fetchUpdatePackingListIsSaved(request, payload),
      updatePackingListPacker: (payload: UpdatePackingListPackerInput) =>
        fetchUpdatePackingListPacker(request, payload),
      getGroupMembers: (groupId: string) => fetchGroupMember(request, groupId),
      getPackingListDetail: (pacingListId: string) => fetchPackingListDetail(request, pacingListId),
      addPackingListCategory: (payload: AddTogetherPackingListCategoryInput) =>
        fetchAddPackingListCategory(request, payload),
      updatePackingListCategory: (payload: UpdateTogetherPackingListCategoryInput) =>
        fetchUpdatePackingListCategory(request, payload),
      deletePackingListCategory: (payload: DeleteTogetherPackingListCategoryInput) =>
        fetchDeletePackingListCategory(request, payload),
      addPackingListItem: (payload: AddTogetherPackingListItemInput) =>
        fetchAddPackingListItem(request, payload),
      updatePackingListItem: (payload: UpdateTogetherPackingListItemInput) =>
        fetchUpdatePackingListItem(request, payload),
      deletePackingListItem: (payload: DeleteTogetherPackingListItemInput) =>
        fetchDeletePackingListItem(request, payload),
      getTogetherFolder: () => fetchTogetherFolder(request),
      addTogetherPackingListFolder: (payload: AddTogetherPackingListIntroInput) =>
        fetchAddTogetherPackingFolder(request, payload),
      getInvited: (inviteCode: string) => fetchInvited(request, inviteCode),
    },
  };
};

export default createTogetherAPI;

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
  const authReq = request;

  return {
    together: {
      updatePackingListTitle: (payload: UpdatePackingListTitleInput) =>
        fetchUpdatePackingListTitle(authReq, payload),
      updatePackingListDate: (payload: UpdatePackingListDateInput) =>
        fetchUpdatePackingListDate(authReq, payload),
      updatePackingListIsSaved: (payload: UpdatePackingListIsSavedInput) =>
        fetchUpdatePackingListIsSaved(authReq, payload),
      updatePackingListPacker: (payload: UpdatePackingListPackerInput) =>
        fetchUpdatePackingListPacker(authReq, payload),
      getGroupMembers: (groupId: string) => fetchGroupMember(authReq, groupId),
      getPackingListDetail: (pacingListId: string) => fetchPackingListDetail(authReq, pacingListId),
      addPackingListCategory: (payload: AddTogetherPackingListCategoryInput) =>
        fetchAddPackingListCategory(authReq, payload),
      updatePackingListCategory: (payload: UpdateTogetherPackingListCategoryInput) =>
        fetchUpdatePackingListCategory(authReq, payload),
      deletePackingListCategory: (payload: DeleteTogetherPackingListCategoryInput) =>
        fetchDeletePackingListCategory(authReq, payload),
      addPackingListItem: (payload: AddTogetherPackingListItemInput) =>
        fetchAddPackingListItem(authReq, payload),
      updatePackingListItem: (payload: UpdateTogetherPackingListItemInput) =>
        fetchUpdatePackingListItem(authReq, payload),
      deletePackingListItem: (payload: DeleteTogetherPackingListItemInput) =>
        fetchDeletePackingListItem(authReq, payload),
      getTogetherFolder: () => fetchTogetherFolder(authReq),
      addTogetherPackingListFolder: (payload: AddTogetherPackingListIntroInput) =>
        fetchAddTogetherPackingFolder(authReq, payload),
      getInvited: (inviteCode: string) => fetchInvited(authReq, inviteCode),
    },
  };
};

export default createTogetherAPI;

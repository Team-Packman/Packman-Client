import {
  fetchPackingListBody,
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
  fetchAddMember,
  fetchPackingListHeader,
  fetchMembers,
  fetchDeleteMember,
} from '../../../utils/axios/packingList/together/index';
import { AxiosInstance } from 'axios';
import {
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
  AddMemberInput,
  AddMemberOutput,
  GetTogetherPackingListBodyOutput,
  GetTogetherPackingListHeaderOutput,
  GetMembersOutput,
  DeleteGroupMemberInput,
  DeleteGroupMemberOutput,
} from './index';

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
    getPackingListHeader: (
      packingListId: string,
      isAloned: boolean,
      inviteCode?: string,
    ) => Promise<GetTogetherPackingListHeaderOutput>;
    getPackingListBody: (
      packingListId: string,
      inviteCode?: string,
    ) => Promise<GetTogetherPackingListBodyOutput>;
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
    getMembers: (packingListId: string) => Promise<GetMembersOutput>;
    addMember: (payload: AddMemberInput) => Promise<AddMemberOutput>;
    deleteMember: (payload: DeleteGroupMemberInput) => Promise<DeleteGroupMemberOutput>;
  };
}

const createTogetherAPI = (): TogetherAPI => {
  return {
    together: {
      updatePackingListTitle: (payload: UpdatePackingListTitleInput) =>
        fetchUpdatePackingListTitle(payload),
      updatePackingListDate: (payload: UpdatePackingListDateInput) =>
        fetchUpdatePackingListDate(payload),
      updatePackingListIsSaved: (payload: UpdatePackingListIsSavedInput) =>
        fetchUpdatePackingListIsSaved(payload),
      updatePackingListPacker: (payload: UpdatePackingListPackerInput) =>
        fetchUpdatePackingListPacker(payload),
      getPackingListHeader: (packingListId: string, isAloned: boolean, inviteCode?: string) =>
        fetchPackingListHeader(packingListId, isAloned, inviteCode),
      getPackingListBody: (packingListId: string) => fetchPackingListBody(packingListId),
      addPackingListCategory: (payload: AddTogetherPackingListCategoryInput) =>
        fetchAddPackingListCategory(payload),
      updatePackingListCategory: (payload: UpdateTogetherPackingListCategoryInput) =>
        fetchUpdatePackingListCategory(payload),
      deletePackingListCategory: (payload: DeleteTogetherPackingListCategoryInput) =>
        fetchDeletePackingListCategory(payload),
      addPackingListItem: (payload: AddTogetherPackingListItemInput) =>
        fetchAddPackingListItem(payload),
      updatePackingListItem: (payload: UpdateTogetherPackingListItemInput) =>
        fetchUpdatePackingListItem(payload),
      deletePackingListItem: (payload: DeleteTogetherPackingListItemInput) =>
        fetchDeletePackingListItem(payload),
      getTogetherFolder: () => fetchTogetherFolder(),
      addTogetherPackingListFolder: (payload: AddTogetherPackingListIntroInput) =>
        fetchAddTogetherPackingFolder(payload),
      getInvited: (inviteCode: string) => fetchInvited(inviteCode),
      getMembers: (packingListId: string) => fetchMembers(packingListId),
      addMember: (payload: AddMemberInput) => fetchAddMember(payload),
      deleteMember: (payload: DeleteGroupMemberInput) => fetchDeleteMember(payload),
    },
  };
};

export default createTogetherAPI;

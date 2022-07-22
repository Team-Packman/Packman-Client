import { AxiosInstance } from 'axios';
import {
  AddTogetherPackingListIntroInput,
  AddTogetherPackingListIntroOutput,
  GetGroupMembersOutput,
  GetTogetherFolderOutput,
  GetTogetherPackingListDetailOutput,
} from './index';
import withAuth from '../../../utils/axios/withAuth';
import {
  fetchGroupMember,
  fetchPackingListDetail,
} from '../../../utils/axios/packingList/together/mock';
import {
  fetchAddTogetherPackingFolder,
  fetchTogetherFolder,
} from '../../../utils/axios/packingList/together';

export interface TogetherAPI {
  together: {
    getGroupMembers: (groupId: string) => Promise<GetGroupMembersOutput>;
    getPackingListDeatil: (pacingListId: string) => Promise<GetTogetherPackingListDetailOutput>;
    // 연결한 api
    getTogetherFolder: () => Promise<GetTogetherFolderOutput>;
    addTogetherPackingListFolder: (
      payload: AddTogetherPackingListIntroInput,
    ) => Promise<AddTogetherPackingListIntroOutput>;
  };
}

export const createTogetherAPI = (request: AxiosInstance): TogetherAPI => {
  return {
    together: {
      getGroupMembers: (groupId: string) => fetchGroupMember(request, groupId),
      getPackingListDeatil: (listId: string) => fetchPackingListDetail(request, listId),
      // 연결한 api
      getTogetherFolder: () => fetchTogetherFolder(request),
      addTogetherPackingListFolder: (payload: AddTogetherPackingListIntroInput) =>
        fetchAddTogetherPackingFolder(request, payload),
    },
  };
};

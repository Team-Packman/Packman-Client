import {
  fetchFolders,
  fetchAddFolder,
  fetchDeleteFolder,
  fetchUpdateFolderName,
  fetchRecentPackingList,
} from './../../utils/axios/folder';
import {
  GetFoldersOutput,
  AddFolderOutput,
  AddFolderInput,
  UpdateFolderNameInput,
  UpdateFolderNameOutput,
  DeleteFolderOutput,
  GetRecentPackingListOutput,
} from './index';
import { AxiosInstance } from 'axios';
import withAuth from '../../utils/axios/withAuth';

export interface FolderAPI {
  getFolders: () => Promise<GetFoldersOutput>;
  getRecentPackingList: () => Promise<GetRecentPackingListOutput>;
  updateFolderName: (payload: UpdateFolderNameInput) => Promise<UpdateFolderNameOutput>;
  deleteFolder: (folderId: string) => Promise<DeleteFolderOutput>;
  addFolder: (payload: AddFolderInput) => Promise<AddFolderOutput>;
}

export const createFolderAPI = (request: AxiosInstance): FolderAPI => {
  return {
    getFolders: () => fetchFolders(withAuth(request)),
    getRecentPackingList: () => fetchRecentPackingList(withAuth(request)),
    updateFolderName: (payload: UpdateFolderNameInput) =>
      fetchUpdateFolderName(withAuth(request), payload),
    deleteFolder: (folderId: string) => fetchDeleteFolder(withAuth(request), folderId),
    addFolder: (payload: AddFolderInput) => fetchAddFolder(withAuth(request), payload),
  };
};

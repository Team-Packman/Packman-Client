import {
  fetchAddFolders,
  fetchDeleteFolder,
  fetchEditFolderName,
  fetchRecentPackingList,
} from './../../utils/axios/folder/mock';
import {
  GetFoldersOutput,
  AddFolderOutput,
  AddFolderInput,
  EditFolderNameInput,
  EditFolderNameOutput,
  DeleteFolderOutput,
  GetRecentPackingListOutput,
} from './index';
import { AxiosInstance } from 'axios';
import withAuth from '../../utils/axios/withAuth';
import { fetchFolders } from '../../utils/axios/folder/mock';

export interface FolderAPI {
  getFolders: () => Promise<GetFoldersOutput>;
  addFolder: (info: AddFolderInput) => Promise<AddFolderOutput>;
  editFolderName: (info: EditFolderNameInput) => Promise<EditFolderNameOutput>;
  deleteFolder: () => Promise<DeleteFolderOutput>;
  getRecentPackingList: () => Promise<GetRecentPackingListOutput>;
}

export const createFolderAPI = (request: AxiosInstance): FolderAPI => {
  return {
    getFolders: () => fetchFolders(withAuth(request)),
    addFolder: (info: AddFolderInput) => fetchAddFolders(withAuth(request), info),
    editFolderName: (info: EditFolderNameInput) => fetchEditFolderName(withAuth(request), info),
    deleteFolder: () => fetchDeleteFolder(withAuth(request)),
    getRecentPackingList: () => fetchRecentPackingList(withAuth(request)),
  };
};
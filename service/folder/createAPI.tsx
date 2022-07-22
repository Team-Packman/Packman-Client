import {
  UpdateFolderNameInput,
  UpdateFolderNameOutput,
  GetFoldersOutput,
  GetRecentPackingListOutput,
  DeleteFolderOutput,
  AddFolderInput,
  AddFolderOutput,
} from './index';
import { AxiosInstance } from 'axios';
import withAuth from '../../utils/axios/withAuth';
import {
  fetchAddFolder,
  fetchDeleteFolder,
  fetchFolders,
  fetchRecentPackingList,
  fetchUpdateFolderName,
} from '../../utils/axios/folder';

export interface FolderAPI {
  getFolders: () => Promise<GetFoldersOutput>;
  getRecentPackingList: () => Promise<GetRecentPackingListOutput>;
  updateFolderName: (payload: UpdateFolderNameInput) => Promise<UpdateFolderNameOutput>;
  deleteFolder: (folderId: string) => Promise<DeleteFolderOutput>;
  addFolder: (payload: AddFolderInput) => Promise<AddFolderOutput>;
}

const createFolderAPI = (request: AxiosInstance): FolderAPI => {
  const authReq = request;
  return {
    getFolders: () => fetchFolders(authReq),
    getRecentPackingList: () => fetchRecentPackingList(authReq),
    updateFolderName: (payload: UpdateFolderNameInput) => fetchUpdateFolderName(authReq, payload),
    deleteFolder: (folderId: string) => fetchDeleteFolder(authReq, folderId),
    addFolder: (payload: AddFolderInput) => fetchAddFolder(authReq, payload),
  };
};

export default createFolderAPI;

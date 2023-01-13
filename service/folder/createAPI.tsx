import {
  UpdateFolderNameInput,
  UpdateFolderNameOutput,
  GetFoldersOutput,
  GetRecentPackingListOutput,
  DeleteFolderOutput,
  AddFolderInput,
  AddFolderOutput,
} from './index';

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

const createFolderAPI = (): FolderAPI => {
  return {
    getFolders: () => fetchFolders(),
    getRecentPackingList: () => fetchRecentPackingList(),
    updateFolderName: (payload: UpdateFolderNameInput) => fetchUpdateFolderName(payload),
    deleteFolder: (folderId: string) => fetchDeleteFolder(folderId),
    addFolder: (payload: AddFolderInput) => fetchAddFolder(payload),
  };
};

export default createFolderAPI;

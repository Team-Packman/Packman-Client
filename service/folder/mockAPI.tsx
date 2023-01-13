import {
  fetchFolders,
  fetchAddFolder,
  fetchDeleteFolder,
  fetchUpdateFolderName,
  fetchRecentPackingList,
} from '../../utils/axios/folder';
import {
  GetFoldersOutput,
  AddFolderOutput,
  AddFolderInput,
  UpdateFolderNameInput,
  UpdateFolderNameOutput,
  DeleteFolderOutput,
  GetRecentPackingListOutput,
} from './index';

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

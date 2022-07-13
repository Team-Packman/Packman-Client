import { GetFoldersOutput } from './index';
import { AxiosInstance } from 'axios';
import withAuth from '../../utils/axios/withAuth';
import { fetchFolders } from '../../utils/axios/folder';

export interface FolderAPI {
  getFolders: () => Promise<GetFoldersOutput>;
}

export const createFolderAPI = (request: AxiosInstance): FolderAPI => {
  return {
    getFolders: () => fetchFolders(withAuth(request)),
  };
};

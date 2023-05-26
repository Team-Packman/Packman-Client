import { client } from '..';
import {
  AddFolderInput,
  AddFolderOutput,
  DeleteFolderOutput,
  GetFoldersOutput,
  GetRecentPackingListOutput,
  UpdateFolderNameInput,
  UpdateFolderNameOutput,
} from './../../../service/folder/index';

export const fetchFolders = async (): Promise<GetFoldersOutput> => {
  const { data } = await client(`/folder`);
  return data;
};

export const fetchRecentPackingList = async (): Promise<GetRecentPackingListOutput> => {
  const { data } = await client(`/folder/recentCreatedList`);
  return data;
};

export const fetchUpdateFolderName = async (
  payload: UpdateFolderNameInput,
): Promise<UpdateFolderNameOutput> => {
  const { data } = await client.patch(`/folder`, payload);
  return data;
};

export const fetchDeleteFolder = async (folderId: string): Promise<DeleteFolderOutput> => {
  const { data } = await client.delete(`/folder/${folderId}`);
  return data;
};

export const fetchAddFolder = async (payload: AddFolderInput): Promise<AddFolderOutput> => {
  const { data } = await client.post('/folder', payload);
  return data;
};

import {
  AddFolderInput,
  AddFolderOutput,
  DeleteFolderOutput,
  GetFoldersOutput,
  GetRecentPackingListOutput,
  UpdateFolderNameInput,
  UpdateFolderNameOutput,
} from './../../../service/folder/index';
import { AxiosInstance } from 'axios';
import { request } from 'http';

export const fetchFolders = async (request: AxiosInstance): Promise<GetFoldersOutput> => {
  const { data } = await request(`/folder`);
  return data;
};

export const fetchRecentPackingList = async (
  request: AxiosInstance,
): Promise<GetRecentPackingListOutput> => {
  const { data } = await request(`/folder/recentCreatedList`);
  return data;
};

export const fetchUpdateFolderName = async (
  request: AxiosInstance,
  payload: UpdateFolderNameInput,
): Promise<UpdateFolderNameOutput> => {
  const { data } = await request.patch(`/folder`, payload);
  return data;
};

export const fetchDeleteFolder = async (
  request: AxiosInstance,
  folderId: string,
): Promise<DeleteFolderOutput> => {
  const { data } = await request.delete(`/folder/${folderId}`);
  return data;
};

export const fetchAddFolder = async (
  request: AxiosInstance,
  payload: AddFolderInput,
): Promise<AddFolderOutput> => {
  const { data } = await request.post('/folder', payload);
  return data;
};

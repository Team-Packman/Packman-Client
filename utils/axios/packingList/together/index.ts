import {
  GetTogetherPackingListDeatilOutput,
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
} from './../../../../service/packingList/together/index';
import { GetGroupMembersOutput } from '../../../../service/packingList/together/index';
import { AxiosInstance } from 'axios';

export const fetchUpdatePackingListTitle = async (
  request: AxiosInstance,
  payload: UpdatePackingListTitleInput,
): Promise<UpdatePackingListTitleOutput> => {
  const { data } = await request.patch(`/packingList/title`, payload);
  return data;
};

export const fetchGroupMember = async (
  request: AxiosInstance,
  groupId: string,
): Promise<GetGroupMembersOutput> => {
  const { data } = await request(`/together/member/${groupId}`);
  return data;
};

export const fetchPackingListDetail = async (
  request: AxiosInstance,
  listId: string,
  inviteCode: string = '',
): Promise<GetTogetherPackingListDeatilOutput> => {
  const { data } = await request(`/packingList/together/${listId}?invitecCode=${inviteCode}`);
  return data;
};

export const fetchAddPackingListCategory = async (
  request: AxiosInstance,
  payload: AddTogetherPackingListCategoryInput,
): Promise<AddTogetherPackingListCategoryOutput> => {
  const { data } = await request.post(`/packingList/together/category`, payload);
  return data;
};

export const fetchUpdatePackingListCategory = async (
  request: AxiosInstance,
  payload: UpdateTogetherPackingListCategoryInput,
): Promise<UpdateTogetherPackingListCategoryOutput> => {
  const { data } = await request.patch(`/packingList/together/category`, payload);
  return data;
};

export const fetchAddPackingListItem = async (
  request: AxiosInstance,
  payload: AddTogetherPackingListItemInput,
): Promise<AddTogetherPackingListItemOutput> => {
  const { data } = await request.post(`/packingList/together/pack`, payload);
  return data;
};

export const fetchUpdatePackingListItem = async (
  request: AxiosInstance,
  payload: UpdateTogetherPackingListItemInput,
): Promise<UpdateTogetherPackingListItemOutput> => {
  const { data } = await request.patch(`/packingList/together/pack`, payload);
  return data;
};

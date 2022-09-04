import {
  GetSharedPackingListDetailInput,
  GetSharedPackingListDetailOutput,
} from './../../../../service/packingList/common/index';
import { AxiosInstance } from 'axios';

export const fetchSharedPackingListDetail = async (
  request: AxiosInstance,
  { type, inviteCode }: GetSharedPackingListDetailInput,
): Promise<GetSharedPackingListDetailOutput> => {
  const { data } = await request(`/list/${type}/share/${inviteCode}`);
  return data;
};

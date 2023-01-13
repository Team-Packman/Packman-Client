import { client } from '../..';
import {
  GetHelp,
  GetSharedPackingListDetailInput,
  GetSharedPackingListDetailOutput,
} from './../../../../service/packingList/common/index';

export const fetchSharedPackingListDetail = async ({
  type,
  inviteCode,
}: GetSharedPackingListDetailInput): Promise<GetSharedPackingListDetailOutput> => {
  const { data } = await client(`/list/${type}/share/${inviteCode}`);
  return data;
};

export const fetchHelp = async (): Promise<GetHelp> => {
  const { data } = await client(`/help`);
  return data;
};

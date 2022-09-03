import { AxiosInstance } from 'axios';
import { GetGroupMemberInput, GetGroupMemberOutput } from '.';
import { fetchGroupMember } from '../../utils/axios/member';

export interface MemberAPI {
  getGroupMember: (payload: GetGroupMemberInput) => Promise<GetGroupMemberOutput>;
}

const createMemberAPI = (request: AxiosInstance): MemberAPI => {
  return {
    getGroupMember: (payload: GetGroupMemberInput) => fetchGroupMember(request, payload),
  };
};

export default createMemberAPI;

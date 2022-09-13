import { AxiosInstance } from 'axios';
import {
  DeleteGroupMemberInput,
  DeleteGroupMemberOutput,
  GetGroupMemberInput,
  GetGroupMemberOutput,
} from '.';
import { deleteGroupMember, fetchGroupMember } from '../../utils/axios/member';

export interface MemberAPI {
  getGroupMember: (payload: GetGroupMemberInput) => Promise<GetGroupMemberOutput>;
  deleteGroupMember: (payload: DeleteGroupMemberInput) => Promise<DeleteGroupMemberOutput>;
}

const createMemberAPI = (request: AxiosInstance): MemberAPI => {
  return {
    getGroupMember: (payload: GetGroupMemberInput) => fetchGroupMember(request, payload),
    deleteGroupMember: (payload: DeleteGroupMemberInput) => deleteGroupMember(request, payload),
  };
};

export default createMemberAPI;

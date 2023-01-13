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

const createMemberAPI = (): MemberAPI => {
  return {
    getGroupMember: (payload: GetGroupMemberInput) => fetchGroupMember(payload),
    deleteGroupMember: (payload: DeleteGroupMemberInput) => deleteGroupMember(payload),
  };
};

export default createMemberAPI;

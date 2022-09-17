import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ModalForShared from '../../../components/common/ModalForShared';
import useAPI from '../../../utils/hooks/useAPI';
import { authUserAtom, invitationAtom } from '../../../utils/recoil/atom/atom';

function InvitedLanding() {
  const router = useRouter();
  const { folderId, inviteCode } = router.query;
  const user = useRecoilValue(authUserAtom);
  const setInvitation = useSetRecoilState(invitationAtom);

  const getInvited = useAPI((api) => api.packingList.alone.getInvited);

  useEffect(() => {
    if (inviteCode && typeof inviteCode === 'string') {
      setInvitation({ type: 'alone', inviteCode, folderId });
    }
  }, [inviteCode]);

  const { data: info } = useQuery(
    ['getInvited', inviteCode],
    () => getInvited(inviteCode as string),
    {
      enabled: !!inviteCode && !!user.isAlreadyUser,
      onSuccess: ({ data: { id, isOwner } }) => {
        if (isOwner) {
          router.replace(`/alone?id=${id}&folderId=${folderId}`);
        } else {
          router.replace(`/alone/shared?id=${id}`);
        }
      },
    },
  );

  return !user.isAlreadyUser ? <ModalForShared /> : null;
}

export default InvitedLanding;

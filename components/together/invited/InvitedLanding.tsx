import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authUserAtom, invitationAtom } from '../../../utils/recoil/atom/atom';
import useAPI from '../../../utils/hooks/useAPI';
import ModalForInvited from '../../../components/common/ModalForInvited';

function InvitedLanding() {
  const router = useRouter();
  const { inviteCode, folderId } = router.query;
  const user = useRecoilValue(authUserAtom);
  const setInvitation = useSetRecoilState(invitationAtom);
  const getInvited = useAPI((api) => api.packingList.together.getInvited);
  const addMember = useAPI((api) => api.packingList.together.addMember);
  const getSharedPackingListDetail = useAPI(
    (api) => api.packingList.common.getSharedPackingListDetail,
  );

  useEffect(() => {
    if (inviteCode && typeof inviteCode === 'string') {
      setInvitation({ type: 'together', inviteCode, folderId });
    }
  }, [inviteCode]);

  const { mutate } = useMutation('addMember', addMember);
  const { data: info } = useQuery(
    ['getSharedPackingListDetail', inviteCode],
    () => getSharedPackingListDetail({ type: 'together', inviteCode: inviteCode as string }),
    {
      enabled: !!inviteCode,
      select: ({ data }) => data,
    },
  );

  useQuery(['togetherInvited', inviteCode], () => getInvited(inviteCode as string), {
    enabled: !!inviteCode && user.isAlreadyUser,
    onSuccess: ({ data: { id: listId, isMember } }) =>
      isMember
        ? router.replace(`/together?id=${listId}&folderId=${folderId}`)
        : mutate(
            { listId },
            {
              onSuccess: ({ data: { listId } }) =>
                router.replace(`/together?id=${listId}&folderId=${folderId}`),
            },
          ),
  });

  if (!info) return null;
  return !user.isAlreadyUser ? <ModalForInvited title={info.title} /> : null;
}

export default InvitedLanding;

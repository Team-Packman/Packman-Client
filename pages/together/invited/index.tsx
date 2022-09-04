import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authUserAtom, invitationAtom } from '../../../utils/recoil/atom/atom';
import useAPI from '../../../utils/hooks/useAPI';
import ModalForInvited from '../../../components/common/ModalForInvited';

function Invited() {
  const router = useRouter();
  const { inviteCode } = router.query;
  const user = useRecoilValue(authUserAtom);
  const setInvitation = useSetRecoilState(invitationAtom);
  const getInvited = useAPI((api) => api.packingList.together.getInvited);
  const addMember = useAPI((api) => api.packingList.together.addMember);
  const getSharedPackingListDetail = useAPI(
    (api) => api.packingList.common.getSharedPackingListDetail,
  );

  useEffect(() => {
    if (inviteCode && typeof inviteCode === 'string') {
      setInvitation({ inviteCode });
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

  useQuery(['invited', inviteCode], () => getInvited(inviteCode as string), {
    enabled: !!inviteCode && !!info && user.isAlreadyUser && !!user.accessToken,
    onSuccess: ({ data: { id: listId, isMember } }) =>
      isMember
        ? router.replace(`/together?id=${listId}`)
        : mutate(
            { listId },
            {
              onSuccess: ({ data: { listId } }) => router.replace(`/together?id=${listId}`),
            },
          ),
  });

  if (!info) return null;
  return !user.isAlreadyUser && <ModalForInvited title={info.title} />;
}

export default Invited;

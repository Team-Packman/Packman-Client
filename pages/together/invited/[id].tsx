import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authUserAtom, invitationAtom } from '../../../utils/recoil/atom/atom';
import useAPI from '../../../utils/hooks/useAPI';
import ModalForInvited from '../../../components/common/ModalForInvited';

function Invited() {
  const router = useRouter();
  const { invited } = router.query;
  const user = useRecoilValue(authUserAtom);
  const setInvitation = useSetRecoilState(invitationAtom);
  const getInvited = useAPI((api) => api.packingList.together.getInvited);
  const addMember = useAPI((api) => api.packingList.together.addMember);

  const { data } = useQuery(['invited', invited], () => getInvited(invited as string), {
    enabled: !!invited,
    onSuccess: ({ data }) => {
      if (user.isAlreadyUser && data.isMember) {
        router.replace(`/together?id=${data.id}`);
      }
    },
  });

  const { mutate } = useMutation('addMember', addMember);

  if (!data) return null;
  const { data: info } = data;

  const clickHandler = () => {
    if (user.isAlreadyUser) {
      mutate(
        { listId: info.id },
        {
          onSuccess: ({ data: { listId } }) => router.replace(`/together?id=${listId}`),
        },
      );
    } else {
      setInvitation({ listId: info.id, isMember: info.isMember });
      router.push('/login');
    }
  };

  return !info.isMember ? <ModalForInvited title={info.title} clickHandler={clickHandler} /> : null;
}

export default Invited;

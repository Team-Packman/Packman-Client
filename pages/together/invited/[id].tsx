import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authUserAtom, from } from '../../../utils/recoil/atom/atom';
import useAPI from '../../../utils/hooks/useAPI';
import ModalForInvited from '../../../components/common/ModalForInvited';

function Invited() {
  const router = useRouter();
  const { invited } = router.query;
  const user = useRecoilValue(authUserAtom);
  const setFrom = useSetRecoilState(from);
  const getInvited = useAPI((api) => api.packingList.together.getInvited);
  const addMember = useAPI((api) => api.packingList.together.addMember);

  const { data } = useQuery(['invited', invited], () => getInvited(invited as string), {
    enabled: !!invited,
  });

  const { mutate } = useMutation('addMember', addMember);

  if (!data) return null;
  const { data: info } = data;

  const clickHandler = () => {
    if (user.isAlreadyUser) {
      mutate(
        { listId: info.id },
        {
          onSuccess: ({ data: { listId } }) => router.replace(`/together/${listId}`),
        },
      );
    } else {
      setFrom({ url: `/together/${info.id}` });
      router.push('/login');
    }
  };

  return <ModalForInvited title={info.title} clickHandler={clickHandler} />;
}

export default Invited;

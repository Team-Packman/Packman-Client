import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import ModalForInvited from '../../../components/common/ModalForInvited';
import useAPI from '../../../utils/hooks/useAPI';

function Invited() {
  const router = useRouter();
  const { id } = router.query;
  const getInvited = useAPI((api) => api.packingList.together.getInvited);
  const { data } = useQuery(['invited', router.query.id], () => getInvited(id as string), {
    enabled: !!id,
  });

  if (!data) return null;
  return <ModalForInvited title={data.data.title} id={data.data._id} inviteCode={id as string} />;
}

export default Invited;

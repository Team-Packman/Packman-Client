import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import ModalForInvited from '../../../components/common/ModalForInvited';
import useAPI from '../../../utils/hooks/useAPI';

function Invited() {
  const router = useRouter();
  const { invited } = router.query;
  const getInvited = useAPI((api) => api.packingList.together.getInvited);

  const { data } = useQuery(['invited', invited], () => getInvited(invited as string), {
    enabled: !!invited,
  });

  if (!data) return null;
  const { data: info } = data;

  return <ModalForInvited title={info.title} id={info._id} />;
}

export default Invited;

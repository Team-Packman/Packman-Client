import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import ModalForInvited from '../../../components/common/ModalForInvited';
import useAPI from '../../../utils/hooks/useAPI';
import { authedUser } from '../../../utils/recoil/atom/atom';

function Invited() {
  const router = useRouter();
  const client = useQueryClient();
  const user = useRecoilValue(authedUser);
  const { id, invited } = router.query;
  const getInvited = useAPI((api) => api.packingList.together.getInvited);

  const { data } = useQuery(['invited', invited], () => getInvited(invited as string), {
    enabled: false,
  });

  useEffect(() => {
    if (router.isReady) {
      if (user.isAlreadyUser) {
        router.replace(`http://localhost:3000/together/${id}?invite=`);
      } else {
        client.fetchQuery(['invited', invited]);
      }
    }
  }, [router.isReady]);

  if (!data) return null;
  const { data: info } = data;

  return <ModalForInvited title={info.title} id={info._id} />;
}

export default Invited;

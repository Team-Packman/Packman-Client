import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
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

  const { data } = useQuery(['invited', invited], () => getInvited(invited as string), {
    enabled: !!invited,
  });

  if (!data) return null;
  const { data: info } = data;

  const clickHandler = () => {
    if (router.isReady) {
      if (user.isAlreadyUser) {
        // 그룹원 등록 api 추가 예정 > 성공시 아래 경로로 라우팅
        router.replace(`${process.env.NEXT_PUBLIC_DOMAIN}/together/${info.id}`);
      } else {
        setFrom({ url: `/together/${info.id}` });
        router.push('/login');
      }
    }
  };

  return <ModalForInvited title={info.title} clickHandler={clickHandler} />;
}

export default Invited;

import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import useAPI from '../utils/hooks/useAPI';
import useGlobalState from '../utils/hooks/useGlobalState';

function TestLanding() {
  const router = useRouter();
  const { id } = router.query;
  const getGroupMember = useAPI((api) => api.member.getGroupMember);
  const { data } = useQuery(
    ['getGroupMember', id],
    () => getGroupMember({ listId: id as string }),
    {
      enabled: !!id,
    },
  );

  console.log(data);

  return <div></div>;
}

export default TestLanding;

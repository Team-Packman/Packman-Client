import React from 'react';
import { useQuery } from 'react-query';
import useAPI from '../../utils/hooks/useAPI';
import useGlobalState from '../../utils/hooks/useGlobalState';

function TestLanding() {
  const api = useAPI((api) => api.folder.getFolders);
  const { data } = useQuery('test11221', () => api(), {
    suspense: true,
  });
  const [payload] = useGlobalState<boolean>('payload');

  console.log(payload);

  return <div>payload : {JSON.stringify(payload)}</div>;
}

export default TestLanding;

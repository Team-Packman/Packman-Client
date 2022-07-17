import React from 'react';
import { useQuery } from 'react-query';
import useAPI from '../../utils/hooks/useAPI';

function TestLanding() {
  const api = useAPI((api) => api.folder.getFolders);
  const { data } = useQuery('test11221', () => api(), {
    suspense: true,
  });
  return <div>TestLanding</div>;
}

export default TestLanding;

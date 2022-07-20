import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useAPI from '../../utils/hooks/useAPI';
import Layout from '../common/Layout';

interface Query {
  type: 'basic' | 'alone' | 'together';
  templateId: string;
}

function PreviewLanding() {
  const router = useRouter();
  const [query, setQuery] = useState<Query>({
    type: 'basic',
    templateId: '62d44cc78c2a5692567b53ae',
  });
  const getTemplate = useAPI((api) => api.ect.getTemplate);

  const { data } = useQuery('getTemplate', () => getTemplate(query));

  useEffect(() => {
    if (router.isReady) {
      setQuery(router.query as unknown as Query);
    }
  }, [router.isReady]);

  return (
    <Layout back title="템플릿 미리보기">
      PreviewLanding
    </Layout>
  );
}

export default PreviewLanding;

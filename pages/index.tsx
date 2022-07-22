import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import { AsyncBoundary } from '../utils/AsyncBoundary';
import { useSetToken } from '../utils/hooks/useAPI';
import useCache from '../utils/hooks/useCache';

const Home: NextPage = () => {
  const router = useRouter();
  const [user] = useCache('User');
  const { setToken, number } = useSetToken();
  console.log(number);
  // console.log('index', user);

  router.push('/together/invited/3nG1Th');
  return (
    <AsyncBoundary>
      <Layout back title="logo" icon="profile">
        hello next
        <button onClick={() => router.push('/packing-list/alone/1')}>패킹리스트 바로가기</button>
        <button onClick={() => router.push('/select-template')}>템플릿 바로가기</button>
        <button onClick={() => router.push('/profile')}>프로필 바로가기</button>
      </Layout>
    </AsyncBoundary>
  );
};

export default Home;
const StyledRoot = styled.div``;

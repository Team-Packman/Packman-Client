import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '../components/common/Layout';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Layout back title="logo" icon="profile">
      hello next
      <button onClick={() => router.push('/packing-list/alone/1')}>패킹리스트 바로가기</button>
      <button onClick={() => router.push('/select-template')}>템플릿 바로가기</button>
      <button onClick={() => router.push('/profile')}>프로필 바로가기</button>
    </Layout>
  );
};

export default Home;
const StyledRoot = styled.div``;

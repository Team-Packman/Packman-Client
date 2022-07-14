import type { NextPage } from 'next';
import styled from 'styled-components';
import Layout from '../components/common/Layout';

const Home: NextPage = () => {
  return (
    <Layout back title="logo" icon="profile">
      hello next
    </Layout>
  );
};

export default Home;
const StyledRoot = styled.div``;

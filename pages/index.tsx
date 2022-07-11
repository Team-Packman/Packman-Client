import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import useAPI from '../utils/hooks/useAPI';

const Home: NextPage = () => {
  const getGroupMembers = useAPI((api) => api.together.getGroupMembers);

  const { data } = useQuery('example', () => getGroupMembers('3'));

  return <StyledRoot>hello next</StyledRoot>;
};

export default Home;
const StyledRoot = styled.div``;

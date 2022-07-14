import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';

type Icon = 'profile' | 'member';

interface LayoutProps {
  children?: ReactNode;
  back?: boolean;
  title?: string;
  icon?: Icon;
}

function Layout(props: LayoutProps) {
  const { children, back, title, icon } = props;
  return (
    <StyledRoot>
      <Header back={back} title={title} icon={icon} />
      <StyledMain>{children}</StyledMain>
    </StyledRoot>
  );
}

export default Layout;

const StyledRoot = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  padding: 0 2rem;
  padding-bottom: 1.6rem;
  flex-grow: 1;
`;

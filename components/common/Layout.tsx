import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import Header from './Header';

type Icon = 'profile' | 'member';

interface LayoutProps {
  children?: ReactNode;
  back?: boolean;
  title?: string;
  icon?: Icon;
  option?: ReactNode;
}

function Layout(props: LayoutProps) {
  const { children, back, title, icon, option } = props;
  return (
    <StyledRoot>
      <Header back={back} title={title} icon={icon} />
      {option}
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
  background-color: ${packmanColors.white};
`;

const StyledMain = styled.main`
  position: relative;
  padding: 0 2rem;
  padding-bottom: 1.6rem;
  flex-grow: 1;
  background-color: ${packmanColors.white};
`;

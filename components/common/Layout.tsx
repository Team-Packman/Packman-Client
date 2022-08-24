import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import Header from './Header';

type Icon = 'profile' | 'member';

interface LayoutProps {
  children?: ReactNode;
  back?: boolean;
  padding?: boolean;
  title?: string;
  icon?: Icon;
  option?: ReactNode;
  noHeader?: boolean;
}

function Layout(props: LayoutProps) {
  const { children, back, title, icon, option, padding, noHeader } = props;
  return (
    <StyledRoot>
      {!noHeader && <Header back={back} title={title} icon={icon} />}
      {option}
      <StyledMain hasOption={option !== undefined} padding={padding ? true : false}>
        {children}
      </StyledMain>
    </StyledRoot>
  );
}

export default Layout;

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${packmanColors.pmWhite};
  overflow: hidden;
`;

const StyledMain = styled.main<{
  hasOption: boolean;
  padding: boolean;
}>`
  position: relative;
  padding: ${({ padding }) => (padding ? `0 2rem` : `0`)};
  padding-bottom: 1.6rem;
  background-color: ${packmanColors.pmWhite};
  height: ${({ hasOption }) =>
    hasOption ? `calc(var(--vh, 1vh) * 100 - 5.2rem)` : `calc(var(--vh, 1vh) * 100)`};
`;

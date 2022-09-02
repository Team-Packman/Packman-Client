import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import useGlobalState from '../../utils/hooks/useGlobalState';
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

  const [scroll] = useGlobalState<boolean>('scroll');

  return (
    <StyledRoot>
      {!noHeader && <Header back={back} title={title} icon={icon} />}
      {option}
      <StyledMain hasOption={option !== undefined} padding={padding ? true : false} scroll={scroll}>
        {children}
      </StyledMain>
    </StyledRoot>
  );
}

export default Layout;

const StyledRoot = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  background-color: ${packmanColors.pmWhite};
  overflow: hidden;
`;

const StyledMain = styled.main<{
  hasOption: boolean;
  padding: boolean;
  scroll: boolean;
}>`
  position: relative;
  padding: ${({ padding }) => (padding ? `0 2rem` : `0`)};
  padding-bottom: 1.6rem;
  background-color: ${packmanColors.pmWhite};
  // height : hasOption ? viewport - (option + header) : viewport - header
  height: ${({ scroll, hasOption }) =>
    hasOption ? (scroll ? 'calc(100%)' : 'calc(100% - 11.7rem)') : 'calc(100% - 5.2rem)'};
`;

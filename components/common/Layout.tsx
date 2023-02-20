import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
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
  listId?: string;
  folderId?: string;
}

function Layout(props: LayoutProps) {
  const { children, back, title, icon, option, padding, noHeader, listId, folderId } = props;

  const [scroll] = useGlobalState<boolean>('scroll');
  const optionEl = document.querySelector('.layout_option');

  return (
    <StyledRoot>
      {!noHeader && (
        <Header back={back} title={title} icon={icon} listId={listId} folderId={folderId} />
      )}
      {option}
      <StyledMain
        scroll={scroll}
        optionEl={optionEl}
        noHeader={noHeader ?? false}
        padding={padding ?? false}
      >
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
  padding: boolean;
  scroll: boolean;
  noHeader: boolean;
  optionEl: Element | null;
}>`
  position: relative;
  padding: ${({ padding }) => (padding ? `0 2rem` : `0`)};
  background-color: ${packmanColors.pmWhite};
  // height : hasOption ? viewport - (option + header) : viewport - header
  height: ${({ scroll, optionEl }) =>
    optionEl
      ? scroll
        ? 'calc(100%)'
        : `calc(100% - ${getComputedStyle(optionEl).height} - 5.2rem)`
      : 'calc(100% - 5.2rem)'};

  // header가 없는 특정 뷰를 위한 레이아웃
  ${({ noHeader }) =>
    noHeader &&
    css`
      height: calc(100%);
    `}
`;

import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import useGlobalState from '../../utils/hooks/useGlobalState';

interface CheckListHeaderProps {
  children?: ReactNode;
  together?: boolean;
  activeMode: number;
  modeHandler: (idx: number) => void;
}

function CheckListHeader(props: CheckListHeaderProps) {
  const { children } = props;
  const [scroll] = useGlobalState<boolean>('scroll');

  return (
    <StyledRoot scroll={scroll}>
      <StyledTitle>{children}</StyledTitle>
      <StyledCalender>달력(크기 조정 예정)</StyledCalender>
    </StyledRoot>
  );
}

export default CheckListHeader;

const StyledRoot = styled.div<{
  scroll: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${packmanColors.white};
  height: 8.4rem;
  transition: height 0.3s ease, opacity 0.3s ease;
  ${({ scroll }) =>
    scroll &&
    css`
      height: 0;
      opacity: 0;
    `};
`;

const StyledTitle = styled.div`
  height: 3.1rem;
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 3.4rem;
  padding: 0 2rem;
`;

const StyledCalender = styled.div`
  display: flex;
  align-items: flex-end;
  height: 3.1rem;
  padding: 0 2rem;
  background-color: ${packmanColors.white};
  z-index: 2;
`;

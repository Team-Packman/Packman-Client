import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';

interface FunctionSectionProps {
  children: ReactNode;
}

function FunctionSection(props: FunctionSectionProps) {
  const { children } = props;
  return <StyledRoot>{children}</StyledRoot>;
}

export default FunctionSection;

const StyledRoot = styled.section`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  background-color: ${packmanColors.pmWhite};
  box-shadow: 0px -3px 13px rgba(0, 0, 0, 0.05);
  padding: 1.6rem 2rem;
  bottom: 0;
  z-index: 40;
  & > button:first-child {
    margin-bottom: 0.9rem;
  }
`;

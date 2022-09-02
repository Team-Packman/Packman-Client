import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';

interface AddTemplateButtonProps {
  onClick: () => void;
  children?: ReactNode;
}

function AddTemplateButton(props: AddTemplateButtonProps) {
  const { children, onClick: clickHandler } = props;
  return <StyledRoot onClick={clickHandler}>{children}</StyledRoot>;
}

export default AddTemplateButton;

const StyledRoot = styled.button`
  height: 4rem;
  background-color: ${packmanColors.pmWhite};
  border: 1px solid ${packmanColors.black};
  border-radius: 0.8rem;
  font-weight: 600;
  font-size: 1.5rem;
  color: ${packmanColors.black};
  -webkit-text-fill-color: ${packmanColors.black};
`;

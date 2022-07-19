import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';

interface AddTemplateButtonProps {
  onClick: () => void;
}

function AddTemplateButton(props: AddTemplateButtonProps) {
  const { onClick: clickHandler } = props;
  return <StyledRoot onClick={clickHandler}>나만의 템플릿으로 추가</StyledRoot>;
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
`;

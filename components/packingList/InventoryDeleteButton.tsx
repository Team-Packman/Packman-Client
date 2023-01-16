import React, { PropsWithChildren } from 'react';
import Button from '../common/Button';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';

interface InventoryDeleteButtonProps {
  onClick: VoidFunction;
}

function InventoryDeleteButton(props: PropsWithChildren<InventoryDeleteButtonProps>) {
  const { children, onClick } = props;

  return (
    <StyledRoot>
      <Button onClick={onClick}>{children}</Button>
    </StyledRoot>
  );
}

export default InventoryDeleteButton;

const StyledRoot = styled.div`
  position: fixed;
  bottom: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(100vw - 4rem);
  height: 4.1rem;

  color: ${packmanColors.pmWhite};
  background-color: ${packmanColors.pmPink};
  border-radius: 0.8rem;
  border: none;
`;

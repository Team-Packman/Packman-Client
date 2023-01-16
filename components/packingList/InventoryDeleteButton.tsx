import React, { PropsWithChildren, ReactNode } from 'react';
import Button from '../common/Button';
import styled from 'styled-components';

interface InventoryDeleteButtonProps {
  children: ReactNode;
  onClick: VoidFunction;
}

function InventoryDeleteButton(props: PropsWithChildren<InventoryDeleteButtonProps>) {
  const { children, onClick } = props;

  return (
    <StyledRoot>
      <Button.LongButton onClick={onClick}>{children}</Button.LongButton>
    </StyledRoot>
  );
}

export default InventoryDeleteButton;

const StyledRoot = styled.div`
  width: calc(100vw - 4rem);
  position: fixed;
  bottom: 1.5rem;
`;

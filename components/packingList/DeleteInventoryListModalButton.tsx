import React from 'react';
import Button from '../common/Button';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';

interface DeleteInventoryButtonProps {
  onCancel: VoidFunction;
  onDelete: VoidFunction;
}

function DeleteInventoryListModalButton(props: DeleteInventoryButtonProps) {
  const { onCancel, onDelete } = props;

  return (
    <StyledRoot>
      <Button
        onClick={onCancel}
        color={packmanColors.pmDeepGrey}
        background={packmanColors.pmWhite}
      >
        아니오
      </Button>

      <Button onClick={onDelete}>네</Button>
    </StyledRoot>
  );
}

export default DeleteInventoryListModalButton;

const StyledRoot = styled.div`
  display: flex;
  width: 100%;
  height: 3.4rem;
  justify-content: space-between;
  & button:not(:last-child) {
    margin-right: 0.8rem;
  }
`;

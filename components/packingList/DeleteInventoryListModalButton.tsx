import React from 'react';
import Button from '../common/Button';
import styled from 'styled-components';

interface DeleteInventoryButtonProps {
  cancel: VoidFunction;
  deleteList: VoidFunction;
}

function DeleteInventoryListModalButton(props: DeleteInventoryButtonProps) {
  const { cancel, deleteList } = props;

  return (
    <StyledRoot>
      <Button.CancelButton onClick={cancel}>아니오</Button.CancelButton>
      <Button.ConfirmButton onClick={deleteList}>네</Button.ConfirmButton>
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

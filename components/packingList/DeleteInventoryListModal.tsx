import React from 'react';
import Modal from '../common/Modal';
import styled from 'styled-components';
import { FONT_STYLES } from '../../styles/font';
import DeleteInventoryButton from './DeleteInventoryListModalButton';

interface DeleteInventoryListModalProps {
  title: string;
  onClick: VoidFunction;
  cancel: VoidFunction;
  deleteList: VoidFunction;
}

function DeleteInventoryListModal(props: DeleteInventoryListModalProps) {
  const { title, onClick, cancel, deleteList } = props;

  return (
    <Modal onClick={onClick}>
      <Modal.Body>
        <StyledTitle>{title}</StyledTitle>
      </Modal.Body>
      <Modal.Controls
        controls={<DeleteInventoryButton cancel={cancel} deleteList={deleteList} />}
      />
    </Modal>
  );
}

export default DeleteInventoryListModal;

const StyledTitle = styled.p`
  display: flex;
  justify-content: center;
  ${FONT_STYLES.SUBHEAD1_SEMIBOLD};
  padding-bottom: 3.7rem;
  color: #282828;
`;

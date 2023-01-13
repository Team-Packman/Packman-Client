import React from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';
import { packmanColors } from '../../styles/color';

interface AddToTemplateModalProps {
  title: string;
  onClick: VoidFunction;
}

function AddToTemplateModal(props: AddToTemplateModalProps) {
  const { title, onClick } = props;

  return (
    <Modal onClick={onClick}>
      <Modal.Body>
        <StyledTitle>{title}</StyledTitle>
        <StyledDescription>
          <span>나만의 템플릿</span>
          <span>으로 저장되었습니다.</span>
        </StyledDescription>
      </Modal.Body>
      <Modal.Controls
        controls={<StyledConfirmButton onClick={onClick}>확인</StyledConfirmButton>}
      />
    </Modal>
  );
}

export default AddToTemplateModal;

const StyledTitle = styled.div`
  font-weight: 800;
  font-size: 2.8rem;
  text-align: center;
  color: ${packmanColors.black};
`;
const StyledDescription = styled.div`
  text-align: center;
  margin-top: 2.4rem;

  & > span {
    font-size: 1.4rem;
    color: ${packmanColors.black};
  }
  & > span:first-child {
    font-weight: 600;
    color: ${packmanColors.pmPink};
  }
`;
const StyledConfirmButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  background: ${packmanColors.pmPink};
  border-radius: 0.8rem;

  color: ${packmanColors.pmWhite};
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.8rem;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  margin-top: 4.2rem;
`;

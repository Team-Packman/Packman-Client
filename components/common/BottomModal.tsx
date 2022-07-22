import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import iTrash from '/public/assets/svg/iTrash.svg';
import iEdit from '/public/assets/svg/iEdit.svg';
import iSwipeBar from '/public/assets/svg/iSwipeBar.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ModalDataProps } from '../folder/FolderLanding';
import { FONT_STYLES } from '../../styles/font';

interface BottomModalProps {
  content?: string;
  modalData: ModalDataProps;
  closeModal: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function BottomModal(props: BottomModalProps) {
  const { closeModal, modalData, onEdit, onDelete } = props;

  const [isClickDelete, setIsClickDelete] = useState(false);

  useEffect(() => {
    const setDisableOverflow = () => {
      document.body.style.overflow = 'hidden';
    };
    const resetDisableOverflow = () => {
      document.body.style.overflow = 'unset';
    };

    setDisableOverflow();

    return () => {
      resetDisableOverflow();
    };
  }, []);
  return (
    <>
      <StyledBackground onClick={closeModal} />
      <StyledRoot>
        <Image src={iSwipeBar} alt="스와이프바" />
        <h1>{isClickDelete ? '정말 삭제하시겠어요?' : modalData?.title}</h1>
        <StyledButtonWrapper>
          {isClickDelete ? (
            <>
              <button onClick={() => setIsClickDelete(false)}>
                <p>아니요</p>
              </button>
              <button onClick={() => onDelete(modalData?._id)}>
                <p>네</p>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => onEdit(modalData?._id)}>
                <Image src={iEdit} alt="수정" />
                수정하기
              </button>
              <button onClick={() => setIsClickDelete(true)}>
                <Image src={iTrash} alt="삭제" />
                삭제하기
              </button>
            </>
          )}
        </StyledButtonWrapper>
      </StyledRoot>
    </>
  );
}

export default BottomModal;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.47);
  z-index: 9999;
  overflow-y: hidden;
`;
const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 14.1rem;
  background-color: #fff;
  border-radius: 2.4rem 2.4rem 0 0;
  gap: 0.8rem;
  padding: 0.8rem 0;
  z-index: 10000;

  & > h1 {
    color: #282828;
    font-style: ${FONT_STYLES.SUBHEAD1_SEMIBOLD};
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;

  & > button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    justify-content: center;
    width: 16rem;
    height: 8rem;
    padding: 0;
    border: none;
    border-radius: 0.8rem;
    font-style: ${FONT_STYLES.BODY2_SEMIBOLD};
    background: ${packmanColors.pmBlueGrey};
  }
`;

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
        <h1>{isClickDelete ? '정말 삭제하시겠어요?' : modalData?.name}</h1>
        <StyledButtonWrapper>
          {isClickDelete ? (
            <>
              <button onClick={() => setIsClickDelete(false)}>
                <p>아니요</p>
              </button>
              <button onClick={() => onDelete(modalData?.id)}>
                <p>네</p>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => onEdit(modalData?.id)}>
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
  position: fixed !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 14.1rem;
  background-color: ${packmanColors.pmWhite};
  border-radius: 2.4rem 2.4rem 0 0;
  padding: 0.8rem 0;
  z-index: 10000;
  animation: appear 0.3s;

  & > h1 {
    color: ${packmanColors.pmBlack};
    font-style: ${FONT_STYLES.SUBHEAD1_SEMIBOLD};
    padding-top: 0.8rem;
    padding-bottom: 1rem;
  }

  @keyframes appear {
    from {
      bottom: -10rem;
    }

    to {
      bottom: 0;
    }
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 2.35rem;

  & > button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 8rem;
    border: none;
    border-radius: 0.8rem;
    font-style: ${FONT_STYLES.BODY2_SEMIBOLD};
    background: ${packmanColors.pmBlueGrey};
    color: ${packmanColors.pmDarkGrey};
    /* Safari에서 font color 무시되는 경우를 위한 코드 */
    -webkit-text-fill-color: ${packmanColors.pmDarkGrey};
    opacity: 1;
  }
  & > button:first-child {
    margin-right: 0.8rem;
  }
`;

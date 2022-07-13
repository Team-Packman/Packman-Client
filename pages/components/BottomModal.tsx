import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import iTrash from '../../public/assets/svg/iTrash.svg';
import iEdit from '../../public/assets/svg/iEdit.svg';
import iSwipeBar from '../../public/assets/svg/iSwipeBar.svg';
import Image from 'next/image';
import { useState } from 'react';

interface BottomModalProps {
  closeModal: () => void;
}

function BottomModal(props: BottomModalProps) {
  const { closeModal } = props;
  const modalData = {
    folderName: '국내여행',
  };
  const [isClickDelete, setIsClickDelete] = useState(false);

  return (
    <StyledRoot onClick={closeModal}>
      <StyledModalInfo>
        <Image src={iSwipeBar} alt="스와이프바" />
        <h1>{isClickDelete ? '정말 삭제하시겠어요?' : modalData.folderName}</h1>
        <StyledButtonWrapper>
          <button>
            {!isClickDelete && <Image src={iEdit} alt="수정" />}
            {isClickDelete ? <p onClick={() => setIsClickDelete(false)}>아니요</p> : '수정하기'}
          </button>
          <button onClick={() => setIsClickDelete(true)}>
            {!isClickDelete && <Image src={iTrash} alt="삭제" />}
            {isClickDelete ? <p onClick={() => setIsClickDelete(false)}>네</p> : '삭제하기'}
          </button>
        </StyledButtonWrapper>
      </StyledModalInfo>
    </StyledRoot>
  );
}

export default BottomModal;

const StyledRoot = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.47);
  z-index: 10;
  overflow-y: hidden;
`;
const StyledModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 14.1rem;
  background-color: #fff;
  border-radius: 2.4rem 2.4rem 0 0;
  gap: 0.8rem;

  z-index: 10;
  & > h1 {
    color: #282828;
    font-weight: 700;
    font-size: 1.6rem;
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
    border: none;
    border-radius: 0.8rem;
    font-weight: 600;
    font-size: 1.4rem;
    background: ${packmanColors.blueGray};
  }
`;

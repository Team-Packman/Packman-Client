import SwipeableList from './components/SwipeableList';
import styled from 'styled-components';
import Image from 'next/image';
import iShowMore from '../public/assets/svg/iShowMore.svg';
import Modal from './components/Modal';
import { useState } from 'react';
// import useAPI from '../utils/hooks/useAPI';

function PackingList() {
  const modalData = {
    content: '정말 삭제하시겠어요?',
    leftButtonContent: '아니오',
    rightButtonContent: '예',
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <StyledRoot>
      {showModal && (
        <Modal
          content={modalData.content}
          leftButtonContent={modalData.leftButtonContent}
          rightButtonContent={modalData.rightButtonContent}
          closeModal={() => {
            document.body.style.overflow = 'unset';
            setShowModal(false);
          }}
        />
      )}
      <StyledFolderInfo>
        <h1>해외여행</h1>
        <Image src={iShowMore} alt="상세보기" width={10} height={10} />
      </StyledFolderInfo>
      <SwipeableList
        openModal={() => {
          document.body.style.overflow = 'hidden';
          setShowModal(true);
        }}
      />
    </StyledRoot>
  );
}

export default PackingList;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledFolderInfo = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 2.4rem;
  width: 100%;
  height: 5.4rem;
  gap: 1.4rem;

  & > h1 {
    font-size: 2rem;
    font-weight: 600;
  }
`;

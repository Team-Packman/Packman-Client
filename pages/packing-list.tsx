import SwipeableList from './components/packingList/SwipeableList';
import styled from 'styled-components';
import Image from 'next/image';
import iShowMore from '../public/assets/svg/iShowMore.svg';
import Modal from './components/common/Modal';
import { useState } from 'react';
import BottomModal from './components/common/BottomModal';
import DropBox from './components/packingList/DropBox';
import { AsyncBoundary } from '../utils/AsyncBoundary';

function PackingList() {
  const modalData = {
    content: '정말 삭제하시겠어요?',
    leftButtonContent: '아니오',
    rightButtonContent: '예',
  };
  const folderList = [
    { id: '62bbb80d9d5dc1aa4c3d2839', title: '국내 여행' },
    { id: '62bbb80d9d5dc1aa4c3d2839', title: '해외 여행' },
    { id: '62bbb80d9d5dc1aa4c3d2839', title: '본가갈때챙겨' },
    { id: '62bbb80d9d5dc1aa4c3d2839', title: '폴더이름!!' },
  ];
  const [showModal, setShowModal] = useState(false);
  const [showBottomModal, setShowBottomModal] = useState(false);
  const [toggle, setToggle] = useState(false);

  return (
    <AsyncBoundary>
      <StyledRoot>
        {showBottomModal && (
          <BottomModal
            closeModal={() => {
              document.body.style.overflow = 'unset';
              setShowBottomModal(false);
            }}
          />
        )}
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
          {toggle && <DropBox folderList={folderList} closeDropBox={() => setToggle(false)} />}
          <h1>해외여행</h1>
          <StyledToggleImage
            src={iShowMore}
            alt="상세보기"
            width={24}
            height={24}
            toggle={toggle}
            onClick={() => {
              setToggle(true);
            }}
          />
        </StyledFolderInfo>
        <SwipeableList
          openModal={() => {
            document.body.style.overflow = 'hidden';
            setShowModal(true);
          }}
        />
      </StyledRoot>
    </AsyncBoundary>
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
  gap: 0.4rem;

  & > h1 {
    font-size: 2rem;
    font-weight: 600;
  }
`;
const StyledToggleImage = styled(Image)<{ toggle: boolean }>`
  transition: 0.4s ease-in-out;
  transform: ${({ toggle }) => (toggle ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

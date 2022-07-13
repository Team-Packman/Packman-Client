import SwipeableList from './components/packingList/SwipeableList';
import styled from 'styled-components';
import Image from 'next/image';
import iShowMore from '../public/assets/svg/iShowMore.svg';
import Modal from './components/common/Modal';
import { useState } from 'react';
import BottomModal from './components/common/BottomModal';
import DropBox from './components/packingList/DropBox';
import useAPI from '../utils/hooks/useAPI';
import { useQuery } from 'react-query';

interface PackingList {
  id: string;
  departureDate: string;
  title: string;
  packTotalNum: number;
  packRemainNum: number;
}

function PackingList() {
  const modalData = {
    content: '정말 삭제하시겠어요?',
    leftButtonContent: '아니오',
    rightButtonContent: '예',
  };
  const [showModal, setShowModal] = useState(false);
  const [showBottomModal, setShowBottomModal] = useState(false);
  const [toggle, setToggle] = useState(false);

  const getTogetherPackingList = useAPI((api) => api.packingList.alone.getPackingListWithFolders);
  const { data } = useQuery('packingList', () => getTogetherPackingList(), {});

  if (!data) return;

  const { alonePackingList, folder, currentFolder } = data.data;

  return (
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
        {toggle && <DropBox folderList={folder} closeDropBox={() => setToggle(false)} />}
        <h1>{currentFolder.title}</h1>
        <StyledToggleImage
          src={iShowMore}
          alt="상세보기"
          width={24}
          height={24}
          onClick={() => {
            setToggle(true);
          }}
        />
      </StyledFolderInfo>
      <SwipeableList
        alonePackingList={alonePackingList}
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
  gap: 0.4rem;

  & > h1 {
    font-size: 2rem;
    font-weight: 600;
  }
`;
const StyledToggleImage = styled(Image)`
  transition: 0.4s ease-in-out;
`;

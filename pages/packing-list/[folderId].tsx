import SwipeableList from '../components/packingList/SwipeableList';
import styled from 'styled-components';
import Image from 'next/image';
import iShowMore from '../../public/assets/svg/iShowMore.svg';
import { useState } from 'react';
import Header from '../../components/common/Header';
import DropBox from '../components/packingList/DropBox';
import useAPI from '../../utils/hooks/useAPI';
import { useQuery } from 'react-query';

interface PackingList {
  id: string;
  departureDate: string;
  title: string;
  packTotalNum: number;
  packRemainNum: number;
}

function PackingList() {
  const [toggle, setToggle] = useState(false);
  const getTogetherPackingList = useAPI((api) => api.packingList.alone.getPackingListWithFolders);
  const { data } = useQuery('packingList', () => getTogetherPackingList(), {});

  if (!data) return null;

  const { alonePackingList, folder, currentFolder } = data.data;

  return (
    <StyledRoot>
      <Header back title="패킹 리스트" icon="profile" />

      <StyledFolderInfo>
        {toggle && (
          <DropBox
            folderList={folder}
            closeDropBox={() => setToggle(false)}
            currentId={currentFolder.id}
          />
        )}
        <h1>{currentFolder.title}</h1>
        <StyledToggleImage
          src={iShowMore}
          alt="상세보기"
          width={24}
          height={24}
          onClick={() => {
            setToggle(true);
          }}
          toggle={toggle}
        />
      </StyledFolderInfo>
      <SwipeableList alonePackingList={alonePackingList} />
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
  margin-top: 0.842rem;

  & > h1 {
    font-size: 2rem;
    font-weight: 600;
  }
`;
const StyledToggleImage = styled(Image)<{ toggle: boolean }>`
  transition: 0.2s ease-in-out;
  transform: ${({ toggle }) => (toggle ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

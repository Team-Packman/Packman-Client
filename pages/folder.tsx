import React, { useState } from 'react';
import styled from 'styled-components';
import SwiperContainer from './components/Swiper';
import { packmanColors } from '../styles/color';
import FolderList from './components/FolderList';
import FloatActionButton from './components/FloatActionButton';

export interface MyType {
  id: string;
  title: string;
  listNum: number;
}

export interface MyArrayType {
  data?: MyType[];
}

export interface RecentType {
  data: {
    id: string; // 최근 수정한 패킹리스트 id
    title: string; // 최근 수정한 패킹리스트 제목
    remainDay: number; // 최근 수정한 패킹리스트 남은 날짜
    packTotalNum: number; // 최근 수정한 패킹리스트의 총 짐의 수
    packRemainNum: number; // 최근 수정한 패킹리스트의 체크안된 짐의 수
  };
}

function Folder() {
  //   최근 수정된 리스트 조회 mock
  //   최근 수정된 리스트 데이터를 가져올 때, isEmpty 값을 지정함
  const recentModifiedList: RecentType = {
    data: {
      id: '1',
      title: '혼자 떠나는 여행',
      remainDay: 10,
      packTotalNum: 20,
      packRemainNum: 5,
    },
  };

  const aloneMockData: MyArrayType = {
    data: [
      { id: '1', title: '혼자 국내여행', listNum: 1 },
      { id: '2', title: '혼자 해외여행', listNum: 2 },
      { id: '3', title: '혼자 해외여행', listNum: 3 },
      { id: '4', title: '혼자 국내여행', listNum: 4 },
      { id: '5', title: '혼자 해외여행', listNum: 5 },
      { id: '6', title: '혼자 해외여행', listNum: 10 },
    ],
  };

  const togetherMockData: MyArrayType = {
    data: [
      //   { id: '1', title: '같이 해외여행', listNum: 3 },
      //   { id: '2', title: '같이 해외여행', listNum: 7 },
      //   { id: '3', title: '같이 해외여행', listNum: 9 },
    ],
  };

  const {
    data: { title, remainDay, packTotalNum, packRemainNum },
  } = recentModifiedList;

  const [aloneFolders, setAloneFolders] = useState<MyArrayType>(aloneMockData);
  const [togetherFolders, setTogetherFolders] = useState<MyArrayType>(togetherMockData);

  // 최근 수정 리스트 존재 체크 : mock 데이터 받아올 때, 존재하면 이거 setting
  const [isRecentListExist, setIsRecentListExist] = useState<boolean>(true);

  const isFolderEmpty = (folderArr: MyArrayType) => {
    const isEmpty = true;
    if (Array.isArray(folderArr.data) && !folderArr.data.length) {
      return isEmpty;
    }
    return !isEmpty;
  };

  return (
    <StyledRoot>
      <StyledRecentBanner isRecentListExist={isRecentListExist}>
        {isRecentListExist && (
          <>
            <StyledLabel>
              <StyledTitle>{title}</StyledTitle>
              <StyledPackTotalNum>총{packTotalNum}개의 짐</StyledPackTotalNum>
            </StyledLabel>
            <StyledDday>
              <StyledRemainDay>{`D-${remainDay}`}</StyledRemainDay>
              <StyledLeftMessage>
                아직 <span>{packRemainNum}</span>개의 짐이 남았어요!
              </StyledLeftMessage>
            </StyledDday>
          </>
        )}
      </StyledRecentBanner>
      <SwiperContainer>
        {!isFolderEmpty(togetherFolders) && <FolderList key="1" {...togetherFolders} />}
        {!isFolderEmpty(aloneFolders) && <FolderList key="2" {...aloneFolders} />}
      </SwiperContainer>
      {isRecentListExist && <FloatActionButton />}
    </StyledRoot>
  );
}

export default Folder;

export const StyledRoot = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${packmanColors.white};
`;

// 최근 생성 리스트
export const StyledRecentBanner = styled.article<{ isRecentListExist: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${({ isRecentListExist }) =>
    !isRecentListExist ? '0' : `1px solid ${packmanColors.pmGrey}`};
  border-radius: 1rem;
  margin: 1.4rem 0 2.9rem 0;
  padding: 2rem 2.8rem;
`;

export const StyledLabel = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.9rem;
`;

export const StyledPackTotalNum = styled.p`
  width: fit-content;
  padding: 0.1rem 1rem;
  color: ${packmanColors.pmBlack};
  font-size: 1.3rem;
  border-radius: 1.2rem;
  border: 1px solid ${packmanColors.pmPink};
`;

export const StyledDday = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

export const StyledRemainDay = styled.p`
  font-size: 2.8rem;
  font-family: 'Pretendard';
  font-weight: 800;
  color: ${packmanColors.pmGreen};
`;

export const StyledLeftMessage = styled.p`
  font-size: 1.2rem;
  color: ${packmanColors.pmBlack};

  & > span {
    color: ${packmanColors.pmPink};
  }
`;

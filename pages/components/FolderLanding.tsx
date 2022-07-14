import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import useAPI from '../../utils/hooks/useAPI';
import FloatActionButton from './FloatActionButton';
import FolderList from './FolderList';
import SwiperContainer from './Swiper';

function FolderLanding() {
  const getFolders = useAPI((api) => api.folder.getFolders);
  const getRecentPackingList = useAPI((api) => api.folder.getRecentPackingList);

  const { data: folderData } = useQuery('folderList', () => getFolders(), {
    suspense: true,
  });

  const { data: recentPackingData } = useQuery('recentPacking', () => getRecentPackingList(), {
    suspense: true,
  });

  // 최근 수정 리스트 존재 체크 : mock 데이터 받아올 때, 존재하면 이거 setting
  const [isRecentListExist, setIsRecentListExist] = useState<boolean>(true);

  if (!folderData) {
    return null;
  }

  return (
    <StyledRoot>
      <StyledRecentBanner isRecentListExist={isRecentListExist}>
        {isRecentListExist && (
          <>
            <StyledLabel>
              <StyledTitle>{recentPackingData?.data.title}</StyledTitle>
              <StyledPackTotalNum>
                총{recentPackingData?.data.packTotalNum}개의 짐
              </StyledPackTotalNum>
            </StyledLabel>
            <StyledDday>
              <StyledRemainDay>{`D-${recentPackingData?.data.remainDay}`}</StyledRemainDay>
              <StyledLeftMessage>
                아직 <span>{recentPackingData?.data.packRemainNum}</span>개의 짐이 남았어요!
              </StyledLeftMessage>
            </StyledDday>
          </>
        )}
      </StyledRecentBanner>
      <SwiperContainer>
        {folderData.data.togetherFolders.length && (
          <FolderList key="1" list={folderData?.data.togetherFolders} />
        )}
        {folderData.data.aloneFolders.length && (
          <FolderList key="2" list={folderData?.data.aloneFolders} />
        )}
      </SwiperContainer>
      {isRecentListExist && <FloatActionButton />}
    </StyledRoot>
  );
}

export default FolderLanding;

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

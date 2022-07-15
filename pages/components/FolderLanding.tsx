import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import { GetFoldersOutput } from '../../service/folder';
import { packmanColors } from '../../styles/color';
import useAPI from '../../utils/hooks/useAPI';
import BottomModal from './common/BottomModal';
import FloatActionButton from './FloatActionButton';
import FolderList from './FolderList';
import SwiperContainer from './Swiper';

export interface ModalDataProps {
  id: string;
  title: string;
}

function FolderLanding() {
  const [folderData, setfolderData] = useState<Pick<GetFoldersOutput, 'data'>>();
  // TODO : 최근 수정 리스트 존재 여부(존재하지 않는 경우 204로 오는지 확인후, 처리방법 생각해보기)
  const [isRecentListExist, setIsRecentListExist] = useState<boolean>(false);
  const [showBottomModal, setShowBottomModal] = useState(false);
  const [modalData, setModalData] = useState<ModalDataProps>({ id: '', title: '' });
  const [editableFolderId, setEditableFolderId] = useState<string>('');
  const [editedFolderData, setEditedFolerData] = useState<ModalDataProps>({ id: '', title: '' });

  const getFolders = useAPI((api) => api.folder.getFolders);
  const getRecentPackingList = useAPI((api) => api.folder.getRecentPackingList);
  const editFolderName = useAPI((api) => api.folder.editFolderName);
  const deleteFolder = useAPI((api) => api.folder.deleteFolder);

  const { data } = useQuery('folderList', () => getFolders(), {
    suspense: true,
    onSuccess: (data) => {
      setfolderData(data);
    },
  });

  const { data: recentPackingData } = useQuery('recentPacking', () => getRecentPackingList(), {
    suspense: true,
    onSuccess: () => {
      setIsRecentListExist(true);
    },
  });

  const { mutate: editFolderMutate } = useMutation(
    (editedFolderData: ModalDataProps) => {
      return editFolderName(editedFolderData);
    },
    {
      onSuccess: (data) => {
        setfolderData(data);
      },
    },
  );

  const { mutate: deletFolderMutate } = useMutation(
    (id: string) => {
      return deleteFolder(id);
    },
    {
      onSuccess: (data) => {
        setfolderData(data);
      },
    },
  );

  if (!folderData) {
    return null;
  }

  const handleBottomModalOpen = (id: string, title: string) => {
    setShowBottomModal(true);
    setEditableFolderId('');
    setModalData({ id, title });
  };

  const handleModalEditButtonClick = (id: string) => {
    setEditableFolderId(id);
    setShowBottomModal(false);
  };

  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedFolerData({ id: modalData.id, title: e.target.value });
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditableFolderId('');
      editFolderMutate(editedFolderData);
    }
  };

  const handleModalDeleteButtonClick = (id: string) => {
    setShowBottomModal(false);
    deletFolderMutate(id);
  };

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
          <FolderList
            key="1"
            list={folderData?.data.togetherFolders}
            editableFolderId={editableFolderId}
            onClick={handleBottomModalOpen}
            onChange={handleFolderNameChange}
            onKeyPress={handleEnterKeyPress}
          />
        )}
        {folderData.data.aloneFolders.length && (
          <FolderList
            key="2"
            list={folderData?.data.aloneFolders}
            onClick={handleBottomModalOpen}
            onChange={handleFolderNameChange}
            editableFolderId={editableFolderId}
            onKeyPress={handleEnterKeyPress}
          />
        )}
      </SwiperContainer>
      {isRecentListExist && !showBottomModal && <FloatActionButton />}
      {showBottomModal && (
        <BottomModal
          closeModal={() => {
            document.body.style.overflow = 'unset';
            setShowBottomModal(false);
          }}
          modalData={modalData}
          onEdit={handleModalEditButtonClick}
          onDelete={handleModalDeleteButtonClick}
        />
      )}
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

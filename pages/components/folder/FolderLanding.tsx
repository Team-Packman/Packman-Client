import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { AddFolderInput, GetFoldersOutput } from '../../../service/folder';
import { packmanColors } from '../../../styles/color';
import useAPI from '../../../utils/hooks/useAPI';
import BottomModal from '../common/BottomModal';
import FolderList from './FolderList';
import SwiperContainer from '../Swiper';
import Header from '../../../components/common/Header';
import FloatActionButton from './FloatActionButton';

export interface ModalDataProps {
  id: string;
  title: string;
}

function FolderLanding() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showBottomModal, setShowBottomModal] = useState(false);
  const [modalData, setModalData] = useState<ModalDataProps>({ id: '', title: '' });
  const [editableFolderId, setEditableFolderId] = useState<string>('');
  const [editedFolderData, setEditedFolerData] = useState<ModalDataProps>({ id: '', title: '' });
  const [currentSwiperIndex, setCurrentSwiperIndex] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newFolderData, setNewFolderData] = useState<AddFolderInput>({
    title: '',
    isAloned: false,
  });
  const [isOutDated, setIsOutDated] = useState<boolean>(false);

  const getFolders = useAPI((api) => api.folder.getFolders);
  const getRecentPackingList = useAPI((api) => api.folder.getRecentPackingList);
  const editFolderName = useAPI((api) => api.folder.editFolderName);
  const deleteFolder = useAPI((api) => api.folder.deleteFolder);
  const addFolder = useAPI((api) => api.folder.addFolder);

  const { data: test } = useQuery('folderListKey', () => getFolders(), {
    suspense: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: recentPackingData, isError } = useQuery(
    'recentPacking',
    () => getRecentPackingList(),
    {
      suspense: true,
      onSuccess: (data) => {
        const { remainDay } = data.data;
        setIsOutDated(remainDay < 0);
      },
    },
  );

  const { mutate: editFolderMutate } = useMutation(
    'editkey',
    (editedFolderData: ModalDataProps) => {
      return editFolderName(editedFolderData);
    },
  );

  const { mutate: deletFolderMutate } = useMutation((id: string) => {
    return deleteFolder(id);
  });

  const { mutate: addFolderMutate } = useMutation((info: { title: string; isAloned: boolean }) => {
    return addFolder(info);
  });

  const folderList: GetFoldersOutput | undefined = queryClient.getQueryData('folderListKey');

  if (!test || !folderList) {
    return null;
  }

  const { aloneFolders, togetherFolders } = folderList.data;

  // Bottom modal handler
  const handleBottomModalOpen = (id: string, title: string) => {
    setShowBottomModal(true);
    setEditableFolderId('');
    setModalData({ id, title });
  };

  const handleModalEditButtonClick = (id: string) => {
    setEditableFolderId(id);
    setShowBottomModal(false);
  };

  const handleModalDeleteButtonClick = (id: string) => {
    setShowBottomModal(false);
    deletFolderMutate(id, {
      onSuccess: () => {
        queryClient.setQueryData('folderListKey', (oldData: any) => {
          return {
            ...oldData,
            data: {
              aloneFolders: aloneFolders.filter((v) => v.id !== id),
              togetherFolders: togetherFolders.filter((v) => v.id !== id),
            },
          };
        });
      },
    });
  };

  // 폴더 수정 관련 핸들러
  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedFolerData({ id: modalData.id, title: e.target.value });
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditableFolderId('');
      editFolderMutate(editedFolderData, {
        onSuccess: () => {
          queryClient.setQueryData('folderListKey', (oldData: any) => {
            return {
              ...oldData,
              data: {
                aloneFolders: aloneFolders.map((v) => {
                  if (v.id === editedFolderData.id) {
                    return { ...v, title: editedFolderData.title };
                  }
                  return v;
                }),
                togetherFolders: togetherFolders.map((v) => {
                  if (v.id === editedFolderData.id) {
                    return { ...v, title: editedFolderData.title };
                  }
                  return v;
                }),
              },
            };
          });
        },
      });
    }
  };

  // 폴더 삭제 관련 핸들러
  const handleAddFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderData({ title: e.target.value, isAloned: currentSwiperIndex === 1 ? true : false });
  };

  const handleAddFolderKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      addFolderMutate(newFolderData, {
        onSuccess: (data) => {
          queryClient.setQueryData('folderListKey', (oldData: any) => {
            return {
              ...oldData,
              // TODO : 혼자폴더인지 함께 폴더인지 구분하고 폴더를 추가해야함.
              data: {
                aloneFolders:
                  currentSwiperIndex === 1
                    ? [
                        {
                          id: data.data.aloneFolders[0].id,
                          title: newFolderData.title,
                          listNum: 0,
                        },
                      ].concat(aloneFolders)
                    : aloneFolders,
                togetherFolders:
                  currentSwiperIndex === 0
                    ? [
                        {
                          id: data.data.togetherFolders[0].id,
                          title: newFolderData.title,
                          listNum: 0,
                        },
                      ].concat(togetherFolders)
                    : togetherFolders,
              },
            };
          });
        },
      });
    }
  };

  const handleCancleAddFolder = () => {
    setIsEditing(false);
  };

  // router 관련 핸들러
  const handleRecentBannerClick = () => {
    router.push(`/${recentPackingData?.data.url}`);
  };

  const handleFolderClick = (id: string, categoryName: string) => {
    router.push(`/packing-list/${categoryName}/${id}`);
  };

  const getSwiperIndex = (index: number) => {
    setCurrentSwiperIndex(index);
  };

  // Floating modal onClick handler
  const handleFloatClick = (index: number) => {
    if (index === 0) {
      router.push('/packing-list/together');
    } else if (index === 1) {
      router.push('/packing-list/alone');
    } else if (index === 2) {
      setIsEditing(true);
    }
  };

  return (
    <>
      <StyledRoot>
        <Header title="logo" icon="profile" />
        <StyledRecentBanner isRecentListExist={!isError} onClick={handleRecentBannerClick}>
          {!isError && (
            <>
              <StyledLabel>
                <StyledTitle>{recentPackingData?.data.title}</StyledTitle>
                <StyledPackTotalNum>
                  총{recentPackingData?.data.packTotalNum}개의 짐
                </StyledPackTotalNum>
              </StyledLabel>
              <StyledDday>
                <StyledRemainDay>
                  {isOutDated ? 'Done!' : `D-${recentPackingData?.data.remainDay}`}
                </StyledRemainDay>
                <StyledLeftMessage>
                  {!isOutDated && recentPackingData?.data.packRemainNum !== 0 ? (
                    <span>
                      <em> {'패킹'}</em>이 완료되었어요!
                    </span>
                  ) : (
                    <span>
                      아직<em> {recentPackingData?.data.packRemainNum}</em> 개의 짐이 남았어요!
                    </span>
                  )}
                </StyledLeftMessage>
              </StyledDday>
            </>
          )}
        </StyledRecentBanner>
        <SwiperContainer isRecentListExist={!isError} getSwiperIndex={getSwiperIndex}>
          {togetherFolders.length && (
            <FolderList
              key="1"
              categoryName="together"
              list={togetherFolders}
              editableFolderId={editableFolderId}
              onClick={handleBottomModalOpen}
              onChange={handleFolderNameChange}
              onKeyPress={handleEnterKeyPress}
              onFolderClick={handleFolderClick}
              handleAddFolderChange={handleAddFolderChange}
              handleAddFolderKeyPress={handleAddFolderKeyPress}
              isEditing={isEditing && currentSwiperIndex === 0}
              handleCancleAddFolder={handleCancleAddFolder}
            />
          )}
          {aloneFolders.length && (
            <FolderList
              key="2"
              categoryName="alone"
              list={aloneFolders}
              editableFolderId={editableFolderId}
              onClick={handleBottomModalOpen}
              onChange={handleFolderNameChange}
              onKeyPress={handleEnterKeyPress}
              onFolderClick={handleFolderClick}
              handleAddFolderChange={handleAddFolderChange}
              handleAddFolderKeyPress={handleAddFolderKeyPress}
              isEditing={isEditing && currentSwiperIndex === 1}
              handleCancleAddFolder={handleCancleAddFolder}
            />
          )}
        </SwiperContainer>
        {!isError && !showBottomModal && (
          <FloatActionButton onClick={handleFloatClick} pageName="folder" />
        )}
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
    </>
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
  background-color: ${packmanColors.pmWhite};
`;

// 최근 생성 리스트
export const StyledRecentBanner = styled.article<{ isRecentListExist: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0;
  border-radius: 1rem;
  margin: 1.4rem 0 2.9rem 0;
  padding: 2rem 2.8rem;
  background-color: ${packmanColors.pmBlueGrey};
  width: calc(100% - 4rem);
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
    & > em {
      color: ${packmanColors.pmPink};
    }
  }
`;

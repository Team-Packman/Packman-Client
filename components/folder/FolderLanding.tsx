import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { AddFolderInput, GetFoldersOutput } from '../../service/folder';
import { packmanColors } from '../../styles/color';
import useAPI from '../../utils/hooks/useAPI';
import BottomModal from '../common/BottomModal';
import FolderList from './FolderList';
import SwiperContainer from '../Swiper';
import Header from '../common/Header';
import FloatActionButton from './FloatActionButton';

export interface ModalDataProps {
  _id: string;
  title: string;
}

function FolderLanding() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showBottomModal, setShowBottomModal] = useState(false);
  const [modalData, setModalData] = useState<ModalDataProps>({ _id: '', title: '' });
  const [editableFolderId, setEditableFolderId] = useState<string>('');
  const [editedFolderData, setEditedFolerData] = useState<ModalDataProps>({ _id: '', title: '' });
  const [currentSwiperIndex, setCurrentSwiperIndex] = useState<number>(0);
  const [addNewFolder, setAddNewFolder] = useState<boolean>(false);
  const [newFolderData, setNewFolderData] = useState<AddFolderInput>({
    title: '',
    isAloned: false,
  });
  const [isOutDated, setIsOutDated] = useState<boolean>(false);
  const [isRecentListExist, setIsRecentListExist] = useState<boolean>(false);

  const getFolders = useAPI((api) => api.folder.getFolders);
  const getRecentPackingList = useAPI((api) => api.folder.getRecentPackingList);
  const updateFolderName = useAPI((api) => api.folder.updateFolderName);
  const deleteFolder = useAPI((api) => api.folder.deleteFolder);
  const addFolder = useAPI((api) => api.folder.addFolder);

  const { data: folderListData } = useQuery('folderListKey', () => getFolders(), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: recentPackingData } = useQuery('recentPacking', () => getRecentPackingList(), {
    onSuccess: (data) => {
      if (data.data) {
        const { remainDay } = data.data;
        setIsOutDated(remainDay < 0);
      }
    },
  });

  const { mutate: editFolderMutate } = useMutation((editedFolderData: ModalDataProps) => {
    return updateFolderName(editedFolderData);
  });

  const { mutate: deletFolderMutate } = useMutation((id: string) => {
    return deleteFolder(id);
  });

  const { mutate: addFolderMutate } = useMutation((info: { title: string; isAloned: boolean }) => {
    return addFolder(info);
  });

  const folderList: GetFoldersOutput | undefined = queryClient.getQueryData('folderListKey');

  useEffect(() => {
    const updateOutdated = () => {
      if (recentPackingData) {
        setIsOutDated(recentPackingData?.data.remainDay < 0);
        setIsRecentListExist(true);
      }
    };
    updateOutdated();
  }, [recentPackingData]);

  if (!folderListData || !folderList) {
    return null;
  }

  const { aloneFolders, togetherFolders } = folderList.data;

  // Bottom modal handler
  const handleBottomModalOpen = (_id: string, title: string) => {
    setShowBottomModal(true);
    setEditableFolderId('');
    setModalData({ _id, title });
  };

  // bottom modal edit click handler
  const onEdit = (_id: string) => {
    setEditableFolderId(_id);
    setShowBottomModal(false);
  };

  const handleModalDeleteButtonClick = (id: string) => {
    setShowBottomModal(false);
    setNewFolderData({ title: '', isAloned: false });
    deletFolderMutate(id, {
      onSuccess: () => {
        queryClient.setQueryData('folderListKey', (oldData: any) => {
          return {
            ...oldData,
            data: {
              aloneFolders: aloneFolders.filter((v) => v._id !== id),
              togetherFolders: togetherFolders.filter((v) => v._id !== id),
            },
          };
        });
      },
    });
  };

  // 폴더 수정 관련 핸들러
  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedFolerData({ _id: modalData._id, title: e.target.value });
  };

  const handleOnBlurInEdit = () => {
    setEditableFolderId('');

    if (editedFolderData.title) {
      editFolderMutate(editedFolderData, {
        onSuccess: () => {
          queryClient.setQueryData('folderListKey', (oldData: any) => {
            return {
              ...oldData,
              data: {
                aloneFolders: aloneFolders.map((v) => {
                  if (v._id === editedFolderData._id) {
                    return { ...v, title: editedFolderData.title };
                  }
                  return v;
                }),
                togetherFolders: togetherFolders.map((v) => {
                  if (v._id === editedFolderData._id) {
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

  // 폴더 추가 관련 핸들러
  const handleStartButtonInInit = () => {
    setAddNewFolder(true);
  };

  const handleAddFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderData({ title: e.target.value, isAloned: currentSwiperIndex === 1 ? true : false });
  };

  const handleOnBlurInAdd = () => {
    setAddNewFolder(false);

    if (newFolderData.title) {
      addFolderMutate(newFolderData, {
        onSuccess: (data) => {
          queryClient.setQueryData('folderListKey', (oldData: any) => {
            return {
              ...oldData,
              data: {
                aloneFolders:
                  currentSwiperIndex === 1
                    ? [
                        {
                          _id: data.data.aloneFolders[0]._id,
                          title: newFolderData.title,
                          listNum: 0,
                        },
                      ].concat(aloneFolders)
                    : aloneFolders,
                togetherFolders:
                  currentSwiperIndex === 0
                    ? [
                        {
                          _id: data.data.togetherFolders[0]._id,
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
    setAddNewFolder(false);
  };

  // router 관련 핸들러
  const handleRecentBannerClick = () => {
    router.push(`${recentPackingData?.data?.url}`);
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
      router.push('/select-template/together');
    } else if (index === 1) {
      router.push('/select-template/alone');
    } else if (index === 2) {
      setAddNewFolder(true);
    }
  };

  return (
    <>
      <StyledRoot>
        <Header title="logo" icon="profile" />
        <StyledRecentBanner isRecentListExist={isRecentListExist} onClick={handleRecentBannerClick}>
          <>
            <StyledLabel>
              <StyledTitle>{recentPackingData?.data?.title}</StyledTitle>
              <StyledPackTotalNum>
                총{recentPackingData?.data?.packTotalNum}개의 짐
              </StyledPackTotalNum>
            </StyledLabel>
            <StyledDday>
              <StyledRemainDay>
                {isOutDated ? 'Done!' : `D-${recentPackingData?.data?.remainDay}`}
              </StyledRemainDay>
              <StyledLeftMessage>
                {!isOutDated && recentPackingData?.data?.packRemainNum !== 0 ? (
                  <span>
                    <em> {'패킹'}</em>이 완료되었어요!
                  </span>
                ) : (
                  !isOutDated && (
                    <span>
                      아직<em> {recentPackingData?.data?.packRemainNum}</em> 개의 짐이 남았어요!
                    </span>
                  )
                )}
              </StyledLeftMessage>
            </StyledDday>
          </>
        </StyledRecentBanner>
        <SwiperContainer isRecentListExist={isRecentListExist} getSwiperIndex={getSwiperIndex}>
          {
            <FolderList
              key="1"
              categoryName="together"
              list={togetherFolders}
              editableFolderId={editableFolderId}
              onClick={handleBottomModalOpen}
              onChange={handleFolderNameChange}
              onFolderClick={handleFolderClick}
              handleAddFolderChange={handleAddFolderChange}
              handleOnBlurInAdd={handleOnBlurInAdd}
              handleOnBlurInEdit={handleOnBlurInEdit}
              addNewFolder={addNewFolder && currentSwiperIndex === 0}
              handleCancleAddFolder={handleCancleAddFolder}
              handleStartButtonInInit={handleStartButtonInInit}
              isRecentListExist={isRecentListExist}
            />
          }
          <FolderList
            key="2"
            categoryName="alone"
            list={aloneFolders}
            editableFolderId={editableFolderId}
            onClick={handleBottomModalOpen}
            onChange={handleFolderNameChange}
            onFolderClick={handleFolderClick}
            handleAddFolderChange={handleAddFolderChange}
            handleOnBlurInAdd={handleOnBlurInAdd}
            handleOnBlurInEdit={handleOnBlurInEdit}
            addNewFolder={addNewFolder && currentSwiperIndex === 1}
            handleCancleAddFolder={handleCancleAddFolder}
            handleStartButtonInInit={handleStartButtonInInit}
            isRecentListExist={isRecentListExist}
          />
        </SwiperContainer>
        {isRecentListExist && !showBottomModal && (
          <FloatActionButton onClick={handleFloatClick} pageName="folder" />
        )}
        {showBottomModal && (
          <BottomModal
            closeModal={() => {
              document.body.style.overflow = 'unset';
              setShowBottomModal(false);
            }}
            modalData={modalData}
            onEdit={onEdit}
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
  display: ${({ isRecentListExist }) => (isRecentListExist ? 'flex' : 'none')};
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

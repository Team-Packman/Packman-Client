import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled, { css } from 'styled-components';
import { AddFolderInput, GetFoldersOutput } from '../../service/folder';
import { packmanColors } from '../../styles/color';
import useAPI from '../../utils/hooks/useAPI';
import BottomModal from '../common/BottomModal';
import FolderList from './FolderList';
import SwiperContainer from '../Swiper';
import FloatActionButton from './FloatActionButton';
import Layout from '../common/Layout';
import Card from '../common/Card';
import Chip from '../common/Chip';
import { Utility } from '../../utils/Utility';

export interface ModalDataProps {
  id: string;
  name: string;
}

function FolderLanding() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showBottomModal, setShowBottomModal] = useState(false);
  const [modalData, setModalData] = useState<ModalDataProps>({ id: '', name: '' });
  const [editableFolderId, setEditableFolderId] = useState<string>('');
  const [editedFolderData, setEditedFolerData] = useState<ModalDataProps>({ id: '', name: '' });
  const [currentSwiperIndex, setCurrentSwiperIndex] = useState<number>(0);
  const [addNewFolder, setAddNewFolder] = useState<boolean>(false);
  const [newFolderData, setNewFolderData] = useState<AddFolderInput>({
    name: '',
    isAloned: false,
  });
  const [isOutDated, setIsOutDated] = useState<boolean>(false);
  const [isRecentListExist, setIsRecentListExist] = useState<boolean>(false);
  const [isFolderExist, setIsFolderExist] = useState<boolean>(false);

  const getFolders = useAPI((api) => api.folder.getFolders);
  const getRecentPackingList = useAPI((api) => api.folder.getRecentPackingList);
  const updateFolderName = useAPI((api) => api.folder.updateFolderName);
  const deleteFolder = useAPI((api) => api.folder.deleteFolder);
  const addFolder = useAPI((api) => api.folder.addFolder);

  const { data: folderListData } = useQuery('folderListKey', () => getFolders());

  const { data: recentPackingData } = useQuery('recentPacking', () => getRecentPackingList(), {
    refetchOnMount: true,
  });

  const { mutate: editFolderMutate } = useMutation((editedFolderData: ModalDataProps) => {
    return updateFolderName(editedFolderData);
  });

  const { mutate: deletFolderMutate } = useMutation((id: string) => {
    return deleteFolder(id);
  });

  const { mutate: addFolderMutate } = useMutation((info: { name: string; isAloned: boolean }) => {
    return addFolder(info);
  });

  const folderList: GetFoldersOutput | undefined = queryClient.getQueryData('folderListKey');

  useEffect(() => {
    const currentRecentPackingData = recentPackingData?.data ?? {};

    if (Object.keys(currentRecentPackingData).length !== 0) {
      setIsRecentListExist(true);
    } else {
      setIsRecentListExist(false);
    }
  }, [recentPackingData]);

  useEffect(() => {
    if (folderList?.data) {
      const { aloneFolder, togetherFolder } = folderList?.data ?? {};

      if (aloneFolder?.length > 0 || togetherFolder?.length > 0) {
        setIsFolderExist(true);
      } else {
        setIsFolderExist(false);
      }
    }
  }, [folderList?.data]);

  if (!folderListData || !folderList || !recentPackingData) {
    return null;
  }

  const { aloneFolder, togetherFolder } = folderList.data;

  // Bottom modal handler
  const handleBottomModalOpen = (id: string, name: string) => {
    setShowBottomModal(true);
    setEditableFolderId('');
    setModalData({ id, name });
  };

  // bottom modal edit click handler
  const onEdit = (id: string) => {
    setEditableFolderId(id);
    setShowBottomModal(false);
  };

  const handleModalDeleteButtonClick = (id: string) => {
    setShowBottomModal(false);
    setNewFolderData({ name: '', isAloned: false });

    deletFolderMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('recentPacking');
        queryClient.setQueryData('folderListKey', (oldData: any) => {
          return {
            ...oldData,
            data: {
              aloneFolder: aloneFolder.filter((v) => v.id !== id),
              togetherFolder: togetherFolder.filter((v) => v.id !== id),
            },
          };
        });
      },
    });
  };

  // 폴더 수정 관련 핸들러
  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedFolerData({ id: modalData.id, name: e.target.value });
  };

  const handleOnBlurInEdit = () => {
    setEditableFolderId('');

    if (editedFolderData.name) {
      editFolderMutate(editedFolderData, {
        onSuccess: () => {
          queryClient.setQueryData('folderListKey', (oldData: any) => {
            return {
              ...oldData,
              data: {
                aloneFolder: aloneFolder.map((v) => {
                  if (v.id === editedFolderData.id) {
                    return { ...v, name: editedFolderData.name };
                  }
                  return v;
                }),
                togetherFolder: togetherFolder.map((v) => {
                  if (v.id === editedFolderData.id) {
                    return { ...v, name: editedFolderData.name };
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
    setNewFolderData({ name: e.target.value, isAloned: currentSwiperIndex === 1 ? true : false });
  };

  const handleOnBlurInAdd = () => {
    setAddNewFolder(false);
    setNewFolderData({ name: '', isAloned: false });

    if (newFolderData.name) {
      addFolderMutate(newFolderData, {
        onSuccess: (data) => {
          queryClient.setQueryData('folderListKey', (oldData: any) => {
            return {
              ...oldData,
              data: {
                aloneFolder:
                  currentSwiperIndex === 1
                    ? [
                        {
                          id: data.data.aloneFolder[0].id,
                          name: newFolderData.name,
                          listNum: '0',
                        },
                      ].concat(aloneFolder)
                    : aloneFolder,
                togetherFolder:
                  currentSwiperIndex === 0
                    ? [
                        {
                          id: data.data.togetherFolder[0].id,
                          name: newFolderData.name,
                          listNum: '0',
                        },
                      ].concat(togetherFolder)
                    : togetherFolder,
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
    router.push(`/packing-list?type=${categoryName}&id=${id}`);
  };

  const getSwiperIndex = (index: number) => {
    setCurrentSwiperIndex(index);
  };

  // Floating modal onClick handler
  const handleFloatClick = (index: number) => {
    if (index === 0) {
      router.push('/select-template?type=together');
    } else if (index === 1) {
      router.push('/select-template?type=alone');
    } else if (index === 2) {
      setAddNewFolder(true);
    }
  };

  return (
    <>
      <Layout title="logo" icon="profile">
        <StyledBody>
          {isRecentListExist && (
            <Card onClick={handleRecentBannerClick}>
              <Card.LeftContainer overlay={leftContainerStyle}>
                <Card.Title value={recentPackingData.data.title} />
                <Card.SubTitle>
                  <Chip text={`총 ${recentPackingData.data.packTotalNum}개의 짐`} />
                </Card.SubTitle>
              </Card.LeftContainer>
              <Card.RightContainer>
                <Card.DDay
                  value={Utility.getDDay(recentPackingData.data.remainDay)}
                  overlay={dayStyle}
                />
                <Card.Description overlay={descriptionStyle}>
                  {Utility.getRemainPackDesc(
                    recentPackingData.data.packRemainNum,
                    recentPackingData.data.remainDay,
                  )}
                </Card.Description>
              </Card.RightContainer>
            </Card>
          )}
          <SwiperContainer
            isRecentListExist={isRecentListExist}
            getSwiperIndex={getSwiperIndex}
            activeIndex={currentSwiperIndex}
          >
            {
              <FolderList
                key="1"
                categoryName="together"
                list={togetherFolder}
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
                isFolderExist={isFolderExist}
              />
            }
            <FolderList
              key="2"
              categoryName="alone"
              list={aloneFolder}
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
              isFolderExist={isFolderExist}
            />
          </SwiperContainer>
          {isFolderExist && !showBottomModal && (
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
        </StyledBody>
      </Layout>
    </>
  );
}

export default FolderLanding;

export const StyledBody = styled.article`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: ${packmanColors.pmWhite};
  padding: 0 2rem;
`;

const leftContainerStyle = css`
  gap: 0.8rem;
`;

const dayStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const descriptionStyle = css`
  & > span {
    & > em {
      color: ${packmanColors.pmPink};
    }
  }
`;

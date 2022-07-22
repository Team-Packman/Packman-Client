import { useEffect, useState } from 'react';
import SwipeableList from '../SwipeableList';
import styled from 'styled-components';
import Image from 'next/image';
import iShowMore from '/public/assets/svg/iShowMore.svg';
import iTrash from '/public/assets/svg/iTrash.svg';
import Header from '../../common/Header';
import DropBox from '../DropBox';
import useAPI from '../../../utils/hooks/useAPI';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import Modal from '../../common/Modal';
import { packmanColors } from '../../../styles/color';
import FloatActionButton from '../../folder/FloatActionButton';
import {
  DeleteTogetherInventoryInput,
  GetTogetherInventoryOutput,
} from '../../../service/inventory/together';
import { FONT_STYLES } from '../../../styles/font';

interface DeleteTogetherInventoryData {
  folderId: string;
  listId: string;
}

function TogetherPackingListLanding() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const query = router.query.id as string;

  //패킹리스트 데이터 조회
  const getTogetherInventory = useAPI((api) => api.inventory.together.getTogetherInventory);
  const { data } = useQuery('getTogetherInventory', () => getTogetherInventory(query), {
    enabled: !!query,
  });

  const deleteTogetherInventory = useAPI(
    (api) => (params: DeleteTogetherInventoryInput) =>
      api.inventory.together.deleteTogetherInventory(params),
  );
  const { mutate: deleteTogetherInventoryMutate } = useMutation(
    (deleteTogetherInventoryData: DeleteTogetherInventoryData) => {
      return deleteTogetherInventory(deleteTogetherInventoryData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getTogetherInventory');
      },
    },
  );

  const [isDragged, setIsDragged] = useState<boolean[]>(
    Array(data?.data.togetherPackingList.length).fill(false),
  );

  if (!data) return null;

  const { togetherPackingList, folder, currentFolder } = data.data;

  const handleIsDragged = (tmpArr: boolean[]) => {
    setIsDragged(tmpArr);
  };

  const checkDeleteList = (id: string) => {
    if (deleteList.includes(id)) {
      setDeleteList((prev) => prev.filter((idx) => idx !== id));
    } else {
      setDeleteList([...deleteList, id]);
    }
  };

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setShowModal(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'unset';
    setShowModal(false);
  };

  const onClickLeftModalButton = () => {
    handleIsDragged(Array(togetherPackingList?.length).fill(false));
    closeModal();
  };

  const onClickRightModalButton = () => {
    setIsDragged((prev) => prev.filter((_, i) => i !== selectedIndex));
    if (isDeleting) {
      console.log(deleteList.join(','));
      deleteTogetherInventoryMutate({
        folderId: currentFolder._id,
        listId: deleteList.join(','),
      });
      setDeleteList([]);
    } else {
      deleteTogetherInventoryMutate({
        folderId: currentFolder._id,
        listId: togetherPackingList[selectedIndex]._id,
      });
    }
    closeModal();
  };

  const handleFloatClick = (index: number) => {
    if (index === 0) {
      router.push('/select-template/together');
    } else if (index === 1) {
      router.push('/select-template/alone');
    }
  };

  return (
    <>
      <Header back title="패킹 리스트" icon="profile" />
      <StyledRoot onTouchMove={() => setToggle(false)}>
        {showModal && (
          <Modal
            title="정말 삭제하시겠어요?"
            closeModal={closeModal}
            button={
              <StyledModalButtonWrapper>
                <StyledModalButton left={true} onClick={onClickLeftModalButton}>
                  아니요
                </StyledModalButton>
                <StyledModalButton onClick={onClickRightModalButton}>예</StyledModalButton>
              </StyledModalButtonWrapper>
            }
          />
        )}

        <StyledFolderInfo>
          <h1>{currentFolder.title}</h1>
          <div>
            <StyledToggleImage
              src={iShowMore}
              alt="상세보기"
              width={24}
              height={24}
              onClick={() => {
                setToggle(true);
              }}
              isToggled={toggle}
            />
            {toggle && (
              <DropBox
                folderList={folder}
                closeDropBox={() => setToggle(false)}
                currentId={currentFolder._id}
                categoryName="together"
              />
            )}
          </div>
        </StyledFolderInfo>

        <StyledMain isEmpty={!togetherPackingList.length}>
          {!togetherPackingList.length ? (
            <StyledEmpty>
              <p>&apos;+&apos; 버튼을 눌러</p>
              <p>패킹 리스트를 추가해주세요</p>
            </StyledEmpty>
          ) : (
            <>
              <StyledCaptionWrapper>
                {!isDeleting && (
                  <StyledCaptionText>
                    <span>{togetherPackingList?.length}</span>개의 패킹 리스트
                  </StyledCaptionText>
                )}
                {isDeleting && (
                  <span
                    onClick={() => {
                      deleteList.length > 0 && setDeleteList([]);
                    }}
                  >
                    선택해제
                  </span>
                )}

                <StyledCaptionButtonWrapper
                  onClick={() => {
                    setIsDragged(Array(togetherPackingList?.length).fill(false));
                    setIsDeleting((prev) => !prev);
                    if (!isDeleting) {
                      setDeleteList([]);
                    }
                  }}
                >
                  {isDeleting ? (
                    <p onClick={() => setIsDragged(Array(togetherPackingList?.length).fill(false))}>
                      취소
                    </p>
                  ) : (
                    <Image
                      src={iTrash}
                      alt="삭제"
                      width={24}
                      height={24}
                      onClick={() => setIsDragged(Array(togetherPackingList?.length).fill(false))}
                    />
                  )}
                </StyledCaptionButtonWrapper>
              </StyledCaptionWrapper>

              <SwipeableList
                packingList={togetherPackingList}
                deleteList={deleteList}
                isDeleting={isDeleting}
                checkDeleteList={checkDeleteList}
                handleIsDragged={handleIsDragged}
                openModal={openModal}
                setSelectedIndex={(id: number) => setSelectedIndex(id)}
                setDeleteList={(arr) => setDeleteList(arr)}
                isDragged={isDragged}
              />
            </>
          )}
        </StyledMain>
        {!isDeleting && <FloatActionButton onClick={handleFloatClick} pageName="packingList" />}
      </StyledRoot>
    </>
  );
}

export default TogetherPackingListLanding;

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
    font-style: ${FONT_STYLES.HEADLINE2_SEMIBOLD};
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const StyledToggleImage = styled(Image)<{ isToggled: boolean }>`
  transition: 0.2s ease-in-out;
  transform: ${({ isToggled }) => (isToggled ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
const StyledMain = styled.div<{ isEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ isEmpty }) => isEmpty && '61.8rem'};
`;
const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  text-align: center;
  color: ${packmanColors.pmGrey};
  font-style: ${FONT_STYLES.HEADLINE1_MEDIUM};
`;
const StyledCaptionWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 8.4rem;

  & > span {
    position: absolute;
    left: 2.6rem;
    bottom: 1rem;
    font-style: ${FONT_STYLES.BODY2_SEMIBOLD};
    color: ${packmanColors.pmDeepGrey};
  }
`;
const StyledCaptionText = styled.p`
  display: flex;
  justify-content: start;
  padding: 1.8rem 0 0 2.4rem;
  margin: 0;
  font-style: ${FONT_STYLES.BODY1_REGULAR};
  color: ${packmanColors.pmDeepGrey};
  & > span {
    font-style: ${FONT_STYLES.BODY2_SEMIBOLD};
    color: ${packmanColors.pmPink};
  }
`;
const StyledCaptionButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  right: 2rem;
  bottom: 0.9rem;
  & > p {
    color: ${packmanColors.pmDeepGrey};
  }
`;
const StyledModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;
const StyledModalButton = styled.button<{ left?: boolean }>`
  width: 13.5rem;
  height: 3.4rem;
  border: ${({ left }) => (left ? `1px solid ${packmanColors.pmDeepGrey}` : 'none')};
  color: ${({ left }) => (left ? packmanColors.pmDeepGrey : packmanColors.pmWhite)};
  background-color: ${({ left }) => (left ? packmanColors.pmWhite : packmanColors.pmPink)};
  border-radius: 0.8rem;
  font-style: ${FONT_STYLES.BODY4_SEMIBOLD};
`;

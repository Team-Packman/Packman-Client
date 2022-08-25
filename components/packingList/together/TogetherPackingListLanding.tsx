import { useState } from 'react';
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
import { DeleteTogetherInventoryInput } from '../../../service/inventory/together';
import { FONT_STYLES } from '../../../styles/font';
import SwipeablelistItem from '../SwipeableListItem';
interface DeleteTogetherInventoryData {
  folderId: string;
  listId: string;
}

function TogetherPackingListLanding() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const query = router.query.id as string;
  const [toggle, setToggle] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  //패킹리스트 데이터 조회
  const getTogetherInventory = useAPI((api) => api.inventory.together.getTogetherInventory);
  const { data } = useQuery(['getTogetherInventory', query], () => getTogetherInventory(query), {
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
    deleteList.includes(id)
      ? setDeleteList((prev) => prev.filter((idx) => idx !== id))
      : setDeleteList([...deleteList, id]);
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
      deleteTogetherInventoryMutate({
        folderId: currentFolder.id,
        listId: deleteList.join(','),
      });
      if (deleteList.length === togetherPackingList.length) {
        setIsDeleting(false);
      }
      setDeleteList([]);
    } else {
      deleteTogetherInventoryMutate({
        folderId: currentFolder.id,
        listId: togetherPackingList[selectedIndex].id,
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

  const onClickCaptionButton = () => {
    setIsDragged(Array(togetherPackingList?.length).fill(false));
    setIsDeleting((prev) => !prev);
    if (!isDeleting) {
      setDeleteList([]);
    }
  };

  const moveToPackingList = (id: string) => {
    if (!isDeleting) {
      router.push(`/together/${id}`);
    }
  };

  return (
    <>
      <Header back title="리스트 목록" icon="profile" />
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
          <h1>{currentFolder.name}</h1>
          <div>
            <StyledToggleImage
              src={iShowMore}
              alt="상세보기"
              toggle={toggle.toString()}
              onClick={() => {
                setToggle(true);
              }}
            />
            {toggle && (
              <DropBox
                folderList={folder}
                closeDropBox={() => setToggle(false)}
                currentId={currentFolder.id}
                categoryName="together"
              />
            )}
          </div>
        </StyledFolderInfo>

        {!togetherPackingList.length ? (
          <StyledMain isEmpty={!togetherPackingList.length}>
            <StyledEmpty>
              <p>&apos;+&apos; 버튼을 눌러</p>
              <p>패킹 리스트를 추가해주세요</p>
            </StyledEmpty>
          </StyledMain>
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

              <StyledCaptionButtonWrapper onClick={onClickCaptionButton}>
                {isDeleting ? (
                  <p
                    onClick={() => handleIsDragged(Array(togetherPackingList?.length).fill(false))}
                  >
                    취소
                  </p>
                ) : (
                  <Image
                    src={iTrash}
                    alt="삭제"
                    width={24}
                    height={24}
                    onClick={() => handleIsDragged(Array(togetherPackingList?.length).fill(false))}
                  />
                )}
              </StyledCaptionButtonWrapper>
            </StyledCaptionWrapper>

            <SwipeableList
              packingList={togetherPackingList}
              deleteList={deleteList}
              isDeleting={isDeleting}
              openModal={openModal}
              setDeleteList={(arr) => setDeleteList(arr)}
              swipeableListItem={togetherPackingList?.map((item, idx) => (
                <SwipeablelistItem
                  key={item.id}
                  idx={idx}
                  isDragged={isDragged[idx]}
                  handleIsDragged={(tmpArr: boolean[]) => handleIsDragged(tmpArr)}
                  isDeleting={isDeleting}
                  deleteList={deleteList}
                  checkDeleteList={(id: string) => checkDeleteList(id)}
                  onClickDeleteButton={() => {
                    setSelectedIndex(idx);
                    openModal();
                  }}
                  packingList={togetherPackingList}
                  moveToPackingList={() => moveToPackingList(item.id)}
                />
              ))}
            />
          </>
        )}

        {!isDeleting && (
          <FloatActionButton
            onClick={handleFloatClick}
            pageName="packingList"
            isAloned="together"
          />
        )}
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
    ${FONT_STYLES.HEADLINE2_SEMIBOLD};
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const StyledToggleImage = styled(Image)<{ toggle: string }>`
  width: 2.4rem;
  height: 2.4rem;
  transition: 0.2s ease-in-out;
  transform: ${({ toggle }) => (toggle === 'true' ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
const StyledMain = styled.div<{ isEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 16.7rem);
`;
const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  text-align: center;
  color: ${packmanColors.pmGrey};
  ${FONT_STYLES.HEADLINE1_MEDIUM};
`;
const StyledCaptionWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 6.9rem;

  & > span {
    position: absolute;
    left: 2.6rem;
    bottom: 0.8rem;
    ${FONT_STYLES.BODY2_SEMIBOLD};
    color: ${packmanColors.pmDeepGrey};
  }
`;
const StyledCaptionText = styled.p`
  display: flex;
  justify-content: start;
  padding: 1.8rem 0 0 2.4rem;
  margin: 0;
  ${FONT_STYLES.BODY1_REGULAR};
  color: ${packmanColors.pmDeepGrey};
  & > span {
    ${FONT_STYLES.BODY2_SEMIBOLD};
    color: ${packmanColors.pmPink};
  }
`;
const StyledCaptionButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  right: 2rem;
  bottom: 0.8rem;
  & > p {
    ${FONT_STYLES.BODY2_SEMIBOLD};
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
  ${FONT_STYLES.BODY4_SEMIBOLD};
`;

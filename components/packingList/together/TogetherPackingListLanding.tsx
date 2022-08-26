import { useState } from 'react';
import SwipeableList from '../SwipeableList';
import styled from 'styled-components';
import Image from 'next/image';
import iShowMore from '/public/assets/svg/iShowMore.svg';
import iTrash from '/public/assets/svg/iTrash.svg';
import Header from '../../common/Header';
import DropBox from '../DropBox';
import { useRouter } from 'next/router';
import Modal from '../../common/Modal';
import { packmanColors } from '../../../styles/color';
import FloatActionButton from '../../folder/FloatActionButton';
import { FONT_STYLES } from '../../../styles/font';
import SwipeablelistItem from '../SwipeableListItem';
import {
  useDeleteTogetherInventory,
  useGetTogetherInventory,
} from '../../../utils/hooks/queries/inventory/inventory';

function TogetherPackingListLanding() {
  const router = useRouter();
  const query = router.query.id as string;
  const [toggle, setToggle] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 함께 패킹리스트 데이터 조회
  const togetherInventory = useGetTogetherInventory(query);

  const deleteTogetherInventoryMutate = useDeleteTogetherInventory({
    folderId: togetherInventory?.data.currentFolder.id as string,
    listId: isDeleting
      ? (deleteList.join(',') as string)
      : (togetherInventory?.data.togetherPackingList[selectedIndex].id as string),
  });

  const [isDragged, setIsDragged] = useState<boolean[]>(
    Array(togetherInventory?.data.togetherPackingList.length).fill(false),
  );

  if (!togetherInventory) return null;

  const { togetherPackingList, folder, currentFolder } = togetherInventory.data;

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
    handleIsDragged(Array(togetherPackingList.length).fill(false));
    document.body.style.overflow = 'unset';
    setShowModal(false);
  };

  const deleteListItem = () => {
    setIsDragged((prev) => prev.filter((_, i) => i !== selectedIndex));

    // 휴지통을 눌러 리스트를 여러 개 삭제하는 경우
    if (isDeleting) {
      if (deleteList.length === togetherPackingList.length) {
        setIsDeleting(false);
      }
      setDeleteList([]);
    }
    deleteTogetherInventoryMutate();
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
    setIsDragged(Array(togetherPackingList.length).fill(false));
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

  // 전체 삭제
  const onClickDeleteButton = () => {
    const payload = togetherPackingList.map(({ id }) => id);
    setDeleteList(payload);
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
                <StyledModalButton left onClick={closeModal}>
                  아니요
                </StyledModalButton>
                <StyledModalButton onClick={deleteListItem}>예</StyledModalButton>
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
              onClick={() => setToggle(true)}
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
                  <span>{togetherPackingList.length}</span>개의 패킹 리스트
                </StyledCaptionText>
              )}
              {isDeleting && (
                <span onClick={() => deleteList.length && setDeleteList([])}>선택해제</span>
              )}

              <StyledCaptionButtonWrapper onClick={onClickCaptionButton}>
                {isDeleting ? (
                  <p onClick={() => handleIsDragged(Array(togetherPackingList.length).fill(false))}>
                    취소
                  </p>
                ) : (
                  <Image
                    src={iTrash}
                    alt="삭제"
                    width={24}
                    height={24}
                    onClick={() => handleIsDragged(Array(togetherPackingList.length).fill(false))}
                  />
                )}
              </StyledCaptionButtonWrapper>
            </StyledCaptionWrapper>

            <SwipeableList
              swipeableListItem={togetherPackingList.map((item, idx) => (
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
        {isDeleting && (
          <StyledButtonWrapper>
            <StyledDeleteButton>
              <div onClick={!deleteList.length ? onClickDeleteButton : openModal}>
                {!deleteList.length
                  ? ' 전체 선택'
                  : deleteList.length === togetherPackingList.length
                  ? '전체 삭제'
                  : '선택 삭제'}
              </div>
            </StyledDeleteButton>
          </StyledButtonWrapper>
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
const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledDeleteButton = styled.button`
  position: fixed;
  bottom: 1.507rem;
  width: calc(100vw - 4rem);
  height: 4.7rem;
  ${FONT_STYLES.BODY4_SEMIBOLD};
  background-color: ${packmanColors.pmPink};
  color: #fff;
  border: none;
  border-radius: 0.5rem;
`;

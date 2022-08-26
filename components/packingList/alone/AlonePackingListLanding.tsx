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
  useDeleteAloneInventory,
  useGetAloneInventory,
} from '../../../utils/hooks/queries/inventory/inventory';

function AlonePackingListLanding() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const query = router.query.id as string;

  // 혼자 패킹리스트 데이터 조회
  const aloneInventory = useGetAloneInventory(query);

  const deleteAloneInventoryMutate = useDeleteAloneInventory({
    folderId: aloneInventory?.data.currentFolder.id as string,
    listId: isDeleting
      ? (deleteList.join(',') as string)
      : (aloneInventory?.data.alonePackingList[selectedIndex].id as string),
  });

  const [isDragged, setIsDragged] = useState<boolean[]>(
    Array(aloneInventory?.data.alonePackingList.length).fill(false),
  );

  if (!aloneInventory) return null;

  const { alonePackingList, folder, currentFolder } = aloneInventory.data;

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
    handleIsDragged(Array(alonePackingList.length).fill(false));
    document.body.style.overflow = 'unset';
    setShowModal(false);
  };

  const deleteListItem = () => {
    setIsDragged((prev) => prev.filter((_, i) => i !== selectedIndex));
    if (isDeleting) {
      if (deleteList.length === alonePackingList.length) {
        setIsDeleting(false);
      }
      setDeleteList([]);
    }
    deleteAloneInventoryMutate();
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
    setIsDragged(Array(alonePackingList.length).fill(false));
    setIsDeleting((prev) => !prev);
    if (!isDeleting) {
      setDeleteList([]);
    }
  };

  const moveToPackingList = (id: string) => {
    if (!isDeleting) {
      router.push(`/alone/${id}`);
    }
  };

  const onClickDeleteButton = () => {
    if (alonePackingList) {
      const payload = alonePackingList.map(({ id }) => id);
      setDeleteList(payload);
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
                <StyledModalButton left={true} onClick={closeModal}>
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
                categoryName="alone"
              />
            )}
          </div>
        </StyledFolderInfo>

        {!alonePackingList.length ? (
          <StyledMain isEmpty={!alonePackingList.length}>
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
                  <span>{alonePackingList?.length}</span>개의 패킹 리스트
                </StyledCaptionText>
              )}
              {isDeleting && (
                <span onClick={() => deleteList.length && setDeleteList([])}>선택 해제</span>
              )}

              <StyledCaptionButtonWrapper onClick={onClickCaptionButton}>
                {isDeleting ? (
                  <p onClick={() => handleIsDragged(Array(alonePackingList.length).fill(false))}>
                    취소
                  </p>
                ) : (
                  <Image
                    src={iTrash}
                    alt="삭제"
                    width={24}
                    height={24}
                    onClick={() => handleIsDragged(Array(alonePackingList.length).fill(false))}
                  />
                )}
              </StyledCaptionButtonWrapper>
            </StyledCaptionWrapper>

            <SwipeableList
              swipeableListItem={alonePackingList.map((item, idx) => (
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
                  packingList={alonePackingList}
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
                  : deleteList.length === alonePackingList.length
                  ? '전체 삭제'
                  : '선택 삭제'}
              </div>
            </StyledDeleteButton>
          </StyledButtonWrapper>
        )}
        {!isDeleting && (
          <FloatActionButton onClick={handleFloatClick} pageName="packingList" isAloned="alone" />
        )}
      </StyledRoot>
    </>
  );
}

export default AlonePackingListLanding;

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
  height: ${({ isEmpty }) => isEmpty && '61.8rem'};
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
  height: 8.4rem;

  & > span {
    position: absolute;
    ${FONT_STYLES.BODY2_SEMIBOLD};
    left: 2rem;
    bottom: 1rem;
    color: ${packmanColors.pmDarkGrey};
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
  bottom: 0.9rem;
  & > p {
    ${FONT_STYLES.BODY2_SEMIBOLD};
    color: ${packmanColors.pmDarkGrey};
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

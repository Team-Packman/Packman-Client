import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import iShowMore from '../../public/assets/svg/iShowMore.svg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import useAPI from '../../utils/hooks/useAPI';
import Modal from '../common/Modal';
import Layout from '../common/Layout';
import SwipeableList from './SwipeableList';
import SwipeablelistItem from './SwipeableListItem';
import FloatActionButton from '../folder/FloatActionButton';
import { FONT_STYLES } from '../../styles/font';
import { packmanColors } from '../../styles/color';
import { GetAloneInventoryOutput } from '../../service/inventory/alone';
import { GetTogetherInventoryOutput } from '../../service/inventory/together';
import CaptionSection from './CaptionSection';
import Link from 'next/link';
import useDynamic from '../../utils/hooks/useDynamic';

type GetInventoryOutput = GetAloneInventoryOutput & GetTogetherInventoryOutput;

function PackingListLanding() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = router.query.id as string;
  const type = router.query.type as string;

  const [toggle, setToggle] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);

  // api 호출
  const getAloneInventory = useAPI((api) => api.inventory.alone.getAloneInventory);
  const getTogetherInventory = useAPI((api) => api.inventory.together.getTogetherInventory);
  const deleteAloneInventory = useAPI((api) => api.inventory.alone.deleteAloneInventory);
  const deleteTogetherInventory = useAPI((api) => api.inventory.together.deleteTogetherInventory);
  const { data: togetherInventory } = useQuery(
    ['getTogetherInventory', id],
    () => getTogetherInventory(id),
    {
      enabled: type === 'together' && !!id,
    },
  );
  const { data: aloneInventory } = useQuery(
    ['getAloneInventory', id],
    () => getAloneInventory(id),
    {
      enabled: type === 'alone' && !!id,
    },
  );

  const { mutate: deleteTogetherInventoryMutate } = useMutation(deleteTogetherInventory, {
    onSuccess: () => {
      queryClient.invalidateQueries('getTogetherInventory');
    },
  });
  const { mutate: deleteAloneInventoryMutate } = useMutation(deleteAloneInventory, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAloneInventory');
    },
  });

  const isInventory = (inventory: unknown): inventory is GetInventoryOutput => {
    if (inventory === undefined || inventory === null) return false;
    return inventory !== undefined;
  };
  const inventory = aloneInventory ?? togetherInventory;

  const [isDragged, setIsDragged] = useState<boolean[]>(
    Array(
      aloneInventory?.data.alonePackingList.length ??
        togetherInventory?.data.togetherPackingList.length,
    ).fill(false),
  );

  const DropBox = useDynamic(() => import('./DropBox'));

  if (!inventory || !isInventory(inventory)) return null;

  const { togetherPackingList, alonePackingList, folder, currentFolder } = inventory.data;

  const handleIsDragged = (tmpArr: boolean[]) => {
    setIsDragged(tmpArr);
  };

  const resetIsDragged = () => {
    setIsDragged(Array((togetherPackingList ?? alonePackingList).length).fill(false));
  };

  const checkDeleteList = (id: string) => {
    deleteList.includes(id)
      ? setDeleteList((prev) => prev.filter((idx) => idx !== id))
      : setDeleteList([...deleteList, id]);
  };

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setShowModal((prev) => !prev);
  };

  const closeModal = () => {
    resetIsDragged();
    document.body.style.overflow = 'unset';
    setShowModal(false);
  };

  const deleteListItem = () => {
    setIsDragged((prev) => prev.filter((_, i) => i !== selectedIndex));
    // 휴지통을 눌러 리스트를 여러 개 삭제하는 경우
    if (isDeleting) {
      type === 'together'
        ? deleteTogetherInventoryMutate({
            folderId: currentFolder.id,
            listId: deleteList.join(','),
          })
        : deleteAloneInventoryMutate({
            folderId: currentFolder.id,
            listId: deleteList.join(','),
          });
      if (deleteList.length === (togetherPackingList ?? alonePackingList).length) {
        setIsDeleting(false);
      }
      setDeleteList([]);
    }
    // 스와이프 액션으로 리스트를 하나씩 삭제하는 경우
    else {
      type === 'together'
        ? deleteTogetherInventoryMutate({
            folderId: currentFolder.id,
            listId: togetherPackingList[selectedIndex].id,
          })
        : deleteAloneInventoryMutate({
            folderId: currentFolder.id,
            listId: alonePackingList[selectedIndex].id,
          });
    }
    closeModal();
  };

  // StyledFolderInfo 클릭한 경우
  const onClickFolderInfo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 스와이프 아이템 하나라도 열려있다면 초기화
    resetSwipableListItem();

    // 폴더 이름과 삼각형 아이콘을 클릭했을 때만 toggle되도록 함
    if (e.target instanceof HTMLDivElement) return;
    setToggle((prev) => !prev);
  };

  const handleFloatClick = (index: number) => {
    if (index === 0) {
      router.push(`/select-template?type=together`);
    } else if (index === 1) {
      router.push(`/select-template?type=alone`);
    }
    resetSwipableListItem();
  };

  const onClickCaptionButton = () => {
    resetIsDragged();
    setIsDeleting((prev) => !prev);
    if (!isDeleting) {
      setDeleteList([]);
    }
  };

  // 전체 삭제
  const onClickDeleteButton = () => {
    const payload = (togetherPackingList ?? alonePackingList).map(({ id }) => id);
    setDeleteList(payload);
  };

  // 개별 삭제
  const onClickDeleteListItem = (idx: number) => {
    openModal();
    setSelectedIndex(idx);
  };

  // SwipableListItem 스와이프 여부 변경
  const handleIsScrolled = (isSwiped: boolean) => {
    setIsSwiped(isSwiped);
  };

  const resetSwipableListItem = () => {
    const checkIsDragged = isDragged.every((item) => !item);
    if (!checkIsDragged && !showModal) {
      resetIsDragged();
    }
  };

  return (
    <Layout back title="리스트 목록" icon="profile">
      {showModal && (
        <Modal
          title="정말 삭제하시겠어요?"
          closeModal={closeModal}
          button={
            <StyledModalButtonWrapper>
              <StyledModalButton left onClick={closeModal}>
                아니요
              </StyledModalButton>
              <StyledModalButton onClick={deleteListItem}>네</StyledModalButton>
            </StyledModalButtonWrapper>
          }
        />
      )}
      <StyledRoot
        onClick={() => {
          toggle && setToggle(false);
        }}
      >
        <StyledFolderInfo onClick={onClickFolderInfo}>
          <h1>{currentFolder.name}</h1>
          <div>
            <StyledToggleImage toggle={toggle.toString()}>
              <Image src={iShowMore} alt="상세보기" layout="fill" />
            </StyledToggleImage>
            {toggle && (
              <DropBox>
                {folder.map(({ id, name }) => (
                  <Link key={id} href={`/packing-list?type=${type}&id=${id}`}>
                    <StyledItem
                      currentId={id === currentFolder.id}
                      onClick={() => setIsDeleting(false)}
                    >
                      {name}
                    </StyledItem>
                  </Link>
                ))}
              </DropBox>
            )}
          </div>
        </StyledFolderInfo>

        {!(togetherPackingList ?? alonePackingList).length ? (
          <StyledMain isEmpty={!(togetherPackingList ?? alonePackingList).length}>
            <StyledEmpty>
              <p>&apos;+&apos; 버튼을 눌러</p>
              <p>패킹 리스트를 추가해주세요</p>
            </StyledEmpty>
          </StyledMain>
        ) : (
          <>
            <CaptionSection
              resetSwipableListItem={resetSwipableListItem}
              packingList={togetherPackingList ?? alonePackingList}
              isDeleting={isDeleting}
              onClickCaptionButton={onClickCaptionButton}
              handleIsDragged={handleIsDragged}
              resetDeleteList={() => deleteList.length && setDeleteList([])}
            />

            <SwipeableList
              isSwiped={isSwiped}
              swipeableListItem={(togetherPackingList ?? alonePackingList).map((item, idx) => (
                <SwipeablelistItem
                  key={item.id}
                  idx={idx}
                  isDragged={isDragged}
                  handleIsDragged={(tmpArr: boolean[]) => handleIsDragged(tmpArr)}
                  isDeleting={isDeleting}
                  deleteList={deleteList}
                  checkDeleteList={(id: string) => checkDeleteList(id)}
                  onClickDeleteButton={() => onClickDeleteListItem(idx)}
                  packingList={togetherPackingList ?? alonePackingList}
                  handleIsScrolled={(isSwiped: boolean) => handleIsScrolled(isSwiped)}
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
                  : deleteList.length === (togetherPackingList ?? alonePackingList).length
                  ? '전체 삭제'
                  : '선택 삭제'}
              </div>
            </StyledDeleteButton>
          </StyledButtonWrapper>
        )}

        {!isDeleting && (
          <FloatActionButton onClick={handleFloatClick} pageName="packingList" isAloned={type} />
        )}
      </StyledRoot>
    </Layout>
  );
}

export default PackingListLanding;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
`;
const StyledFolderInfo = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 2.4rem;
  width: 100%;
  height: 5.4rem;
  margin-top: 0.842rem;
  flex-shrink: 0;

  & > h1 {
    ${FONT_STYLES.HEADLINE2_SEMIBOLD};
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0.4rem;
  }
`;

const StyledItem = styled.div<{ currentId: boolean }>`
  ${({ currentId }) => (currentId ? FONT_STYLES.BODY4_SEMIBOLD : FONT_STYLES.BODY3_REGULAR)};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.8rem;
  font-size: 1.5rem;
  color: ${({ currentId }) => (currentId ? packmanColors.pmBlack : packmanColors.pmDarkGrey)};
  &:not(:last-child) {
    border-bottom: 1px solid ${packmanColors.pmGrey};
  }
`;
const StyledToggleImage = styled.div<{ toggle: string }>`
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

const StyledModalButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 2.1rem;
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

import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import Layout from '../common/Layout';
import SwipeableList from './SwipeableList';
import SwipeablelistItem from './SwipeableListItem';
import FloatActionButton from '../folder/FloatActionButton';
import { FONT_STYLES } from '../../styles/font';
import { packmanColors } from '../../styles/color';
import { GetAloneInventoryOutput } from '../../service/inventory/alone';
import { GetTogetherInventoryOutput } from '../../service/inventory/together';
import CaptionSection from './CaptionSection';
import InventoryDeleteButton from './InventoryDeleteButton';
import useBoolean from '../../utils/hooks/common/useBoolean';
import DeleteInventoryListModal from './DeleteInventoryListModal';
import FolderDropBox from './FolderDropBox';
import apiService from '../../service';

type GetInventoryOutput = GetAloneInventoryOutput & GetTogetherInventoryOutput;

function PackingListLanding() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = router.query.id as string;
  const type = router.query.type as string;

  const [isDropBoxOpen, toggle, setDropBoxClose] = useBoolean(false);
  const [isModalOpen, setModalOpen, setModalClose] = useBoolean(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);

  // api 호출
  const getAloneInventory = apiService.inventory.alone.getAloneInventory;
  const getTogetherInventory = apiService.inventory.together.getTogetherInventory;
  const deleteAloneInventory = apiService.inventory.alone.deleteAloneInventory;
  const deleteTogetherInventory = apiService.inventory.together.deleteTogetherInventory;
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

  if (!isInventory(inventory)) return null;

  const { togetherPackingList, alonePackingList, currentFolder } = inventory.data;

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
    setModalOpen();
  };

  const closeModal = () => {
    resetIsDragged();
    document.body.style.overflow = 'unset';
    setModalClose();
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
      setIsDeleting(false);
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

  const onClickFolderInfo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 스와이프 아이템 하나라도 열려있다면 초기화
    resetSwipableListItem();

    // 폴더 이름과 삼각형 아이콘을 클릭했을 때만 toggle되도록 함
    if (e.target instanceof HTMLDivElement) return;
    toggle();
  };

  const handleFloatClick = (index: number) => {
    if (index === 0) {
      router.push(`/select-template?type=together&folderId=${currentFolder.id}`);
    } else if (index === 1) {
      router.push(`/select-template?type=alone&folderId=${currentFolder.id}`);
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
    if (!checkIsDragged && !isModalOpen) {
      resetIsDragged();
    }
  };

  return (
    <Layout back title="리스트 목록" icon="profile">
      {isModalOpen && (
        <DeleteInventoryListModal
          title="정말 삭제하시겠어요?"
          onClick={closeModal}
          onCancel={closeModal}
          onDelete={deleteListItem}
        />
      )}
      <StyledRoot onClick={() => isDropBoxOpen && setDropBoxClose()}>
        <StyledFolderInfo onClick={onClickFolderInfo}>
          <FolderDropBox onClick={() => setIsDeleting(false)} />
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
          <InventoryDeleteButton onClick={!deleteList.length ? onClickDeleteButton : openModal}>
            {!deleteList.length
              ? ' 전체 선택'
              : deleteList.length === (togetherPackingList ?? alonePackingList).length
              ? '전체 삭제'
              : '선택 삭제'}
          </InventoryDeleteButton>
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

  width: 100%;
  height: 5.4rem;

  padding-left: 2.4rem;
  margin-top: 0.842rem;
  flex-shrink: 0;
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

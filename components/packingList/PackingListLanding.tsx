import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Layout from '../common/Layout';
import SwipeableList from './SwipeableList';
import SwipeableListItem from './SwipeableListItem';
import FloatActionButton from '../folder/FloatActionButton';
import { FONT_STYLES } from '../../styles/font';
import { packmanColors } from '../../styles/color';
import CaptionSection from './CaptionSection';
import InventoryDeleteButton from './InventoryDeleteButton';
import useBoolean from '../../utils/hooks/common/useBoolean';
import DeleteInventoryListModal from './DeleteInventoryListModal';
import FolderDropBox from './FolderDropBox';
import { useInventory, useInventoryMutation } from '../../utils/hooks/queries/inventory';

function PackingListLanding() {
  const router = useRouter();
  const type = router.query.type as string;
  const id = router.query.id as string;

  const [isDropBoxOpen, toggle, setDropBoxClose] = useBoolean(false);
  const [isModalOpen, setModalOpen, setModalClose] = useBoolean(false);

  const [isDeletingMode, setIsDeletingMode] = useState(false);
  const [deleteList, setDeleteList] = useState<Set<string>>(new Set());

  const inventory = useInventory({ id, type });
  const { deleteTogetherInventoryMutate, deleteAloneInventoryMutate } = useInventoryMutation();

  const [isSwiped, setIsSwiped] = useState<Set<string>>(new Set());

  if (!inventory) return null;
  const { togetherPackingList, alonePackingList, currentFolder } = inventory.data;

  const swipe = (item?: string) => {
    if (!item) {
      resetListItem();
      return;
    }
    const updatedListItem = new Set(isSwiped);
    if (isSwiped.size) {
      setIsSwiped(new Set());
      return;
    }
    if (isSwiped.has(item)) {
      updatedListItem.delete(item);
    } else {
      updatedListItem.add(item);
    }
    setIsSwiped(updatedListItem);
  };

  const resetListItem = () => {
    isSwiped.size && setIsSwiped(new Set());
    deleteList.size && setDeleteList(new Set());
  };

  const modifyDeleteList = (id: string) => {
    const updatedListItem = new Set([...deleteList]);
    if (updatedListItem.has(id)) {
      updatedListItem.delete(id);
    } else {
      updatedListItem.add(id);
    }
    setDeleteList(updatedListItem);
  };

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setModalOpen();
  };

  const closeModal = () => {
    document.body.style.overflow = 'unset';
    setModalClose();
  };

  const onClickFolderInfo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    !isDeletingMode && resetListItem();

    // 폴더 이름과 삼각형 아이콘을 클릭했을 때만 toggle되도록 함
    if (e.target instanceof HTMLDivElement) return;
    toggle();
  };

  const onClickFloatingButton = (index: number) => {
    if (index === 0) {
      router.push(`/select-template?type=together&folderId=${currentFolder.id}`);
    } else if (index === 1) {
      router.push(`/select-template?type=alone&folderId=${currentFolder.id}`);
    }
    resetListItem();
  };

  const onClickCaptionButton = () => {
    resetListItem();
    setIsDeletingMode((prev) => !prev);
    if (!isDeletingMode) {
      setDeleteList(new Set());
    }
  };

  const onDelete = () => {
    if (isDeletingMode) {
      type === 'together'
        ? deleteTogetherInventoryMutate({
            folderId: currentFolder.id,
            listId: [...deleteList].join(','),
          })
        : deleteAloneInventoryMutate({
            folderId: currentFolder.id,
            listId: [...deleteList].join(','),
          });
      setIsDeletingMode(false);
      setDeleteList(new Set());
    }
    // 스와이프 액션으로 리스트를 하나씩 삭제하는 경우
    else {
      type === 'together'
        ? deleteTogetherInventoryMutate({
            folderId: currentFolder.id,
            listId: [...deleteList][0],
          })
        : deleteAloneInventoryMutate({
            folderId: currentFolder.id,
            listId: [...deleteList][0],
          });
    }
    closeModal();
  };

  // 전체 삭제
  const deleteSelectedListItems = () => {
    if (!deleteList.size) {
      const updatedListItem = new Set(
        (togetherPackingList ?? alonePackingList).map((item) => item.id),
      );
      setDeleteList(updatedListItem);
    } else {
      setDeleteList(new Set());
    }
  };

  // 개별 삭제
  const deleteSingleListItem = (id: string) => {
    openModal();

    const updatedListItem = new Set<string>();
    updatedListItem.add(id);
    setDeleteList(updatedListItem);
  };

  return (
    <Layout back title="리스트 목록" icon="profile">
      {isModalOpen && (
        <DeleteInventoryListModal
          title="정말 삭제하시겠어요?"
          onClick={closeModal}
          onCancel={closeModal}
          onDelete={onDelete}
        />
      )}
      <StyledRoot onClick={() => isDropBoxOpen && setDropBoxClose()}>
        <StyledFolderInfo onClick={onClickFolderInfo}>
          <FolderDropBox onClick={() => setIsDeletingMode(false)} />
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
              listLength={(togetherPackingList ?? alonePackingList).length}
              isDeletingMode={isDeletingMode}
              onClickCaptionButton={onClickCaptionButton}
              reset={resetListItem}
            />

            <SwipeableList
              isSwiped={isSwiped.size > 0}
              swipeableListItem={(togetherPackingList ?? alonePackingList).map((item, idx) => (
                <SwipeableListItem
                  key={item.id}
                  swipe={(item?: string) => swipe(item)}
                  isSwiped={isSwiped}
                  isDeletingMode={isDeletingMode}
                  deleteList={deleteList}
                  modifyDeleteList={(id: string) => modifyDeleteList(id)}
                  packingList={(togetherPackingList ?? alonePackingList)[idx]}
                  deleteSingleListItem={deleteSingleListItem}
                />
              ))}
            />
          </>
        )}
        {isDeletingMode && (
          <InventoryDeleteButton onClick={!deleteList.size ? deleteSelectedListItems : openModal}>
            {!deleteList.size
              ? ' 전체 선택'
              : deleteList.size === (togetherPackingList ?? alonePackingList).length
              ? '전체 삭제'
              : '선택 삭제'}
          </InventoryDeleteButton>
        )}

        {!isDeletingMode && (
          <FloatActionButton
            onClick={onClickFloatingButton}
            pageName="packingList"
            isAloned={type}
          />
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

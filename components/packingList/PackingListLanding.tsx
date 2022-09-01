import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import iShowMore from '/public/assets/svg/iShowMore.svg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import useAPI from '../../utils/hooks/useAPI';
import Modal from '../common/Modal';
import Layout from '../common/Layout';
import DropBox from './DropBox';
import SwipeableList from './SwipeableList';
import SwipeablelistItem from './SwipeableListItem';
import FloatActionButton from '../folder/FloatActionButton';
import { FONT_STYLES } from '../../styles/font';
import { packmanColors } from '../../styles/color';
import { GetAloneInventoryOutput } from '../../service/inventory/alone';
import { GetTogetherInventoryOutput } from '../../service/inventory/together';
import CaptionSection from './CaptionSection';
interface DeleteInventoryData {
  folderId: string;
  listId: string;
}

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

  // api 호출
  const getAloneInventory = useAPI((api) => api.inventory.alone.getAloneInventory);
  const getTogetherInventory = useAPI((api) => api.inventory.together.getTogetherInventory);
  const deleteAloneInventory = useAPI(
    (api) => (params: DeleteInventoryData) => api.inventory.alone.deleteAloneInventory(params),
  );
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

  const { mutate: deleteTogetherInventoryMutate } = useMutation(
    (deleteTogetherInventoryData: DeleteInventoryData) => {
      return deleteTogetherInventory(deleteTogetherInventoryData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getTogetherInventory');
      },
    },
  );
  const { mutate: deleteAloneInventoryMutate } = useMutation(
    (deleteTogetherInventoryData: DeleteInventoryData) => {
      return deleteAloneInventory(deleteTogetherInventoryData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAloneInventory');
      },
    },
  );

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
  if (!inventory || !isInventory(inventory)) return null;

  const { togetherPackingList, alonePackingList, folder, currentFolder } = inventory.data;

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
    handleIsDragged(Array(togetherPackingList.length ?? alonePackingList.length).fill(false));
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
      if (deleteList.length === (togetherPackingList.length ?? alonePackingList.length)) {
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

  const handleFloatClick = (index: number) => {
    if (index === 0) {
      router.push(`/select-template/together?folderId=${currentFolder.id}`);
    } else if (index === 1) {
      router.push(`/select-template/alone?folderId=${currentFolder.id}`);
    }
  };

  const onClickCaptionButton = () => {
    setIsDragged(Array((togetherPackingList ?? alonePackingList).length).fill(false));
    setIsDeleting((prev) => !prev);
    if (!isDeleting) {
      setDeleteList([]);
    }
  };

  const moveToPackingList = (id: string) => {
    if (!isDeleting) {
      router.push(`/${type}?${id}`);
    }
  };

  // 전체 삭제
  const onClickDeleteButton = () => {
    const payload = (togetherPackingList ?? alonePackingList).map(({ id }) => id);
    setDeleteList(payload);
  };

  return (
    <Layout back title="리스트 목록" icon="profile">
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
                categoryName={type}
              />
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
              packingList={togetherPackingList ?? alonePackingList}
              isDeleting={isDeleting}
              deleteList={deleteList}
              onClickCaptionButton={onClickCaptionButton}
              handleIsDragged={handleIsDragged}
              resetDeleteList={() => deleteList.length && setDeleteList([])}
            />

            <SwipeableList
              swipeableListItem={(togetherPackingList ?? alonePackingList).map((item, idx) => (
                <SwipeablelistItem
                  key={item.id}
                  idx={idx}
                  isDragged={isDragged}
                  handleIsDragged={(tmpArr: boolean[]) => handleIsDragged(tmpArr)}
                  isDeleting={isDeleting}
                  deleteList={deleteList}
                  checkDeleteList={(id: string) => checkDeleteList(id)}
                  onClickDeleteButton={() => {
                    setSelectedIndex(idx);
                    openModal();
                  }}
                  packingList={togetherPackingList ?? alonePackingList}
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
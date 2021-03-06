import { useState, useEffect } from 'react';
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
  DeleteAloneInventoryInput,
  GetAloneInventoryOutput,
} from '../../../service/inventory/alone';
import { FONT_STYLES } from '../../../styles/font';
interface DeleteAloneInventoryData {
  folderId: string;
  listId: string;
}

function AlonePackingListLanding() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const query = router.query.id as string;

  const getAloneInventory = useAPI((api) => api.inventory.alone.getAloneInventory);
  const { data } = useQuery(['getAloneInventory', query], () => getAloneInventory(query), {
    enabled: !!query,
  });

  const deleteAloneInventory = useAPI(
    (api) => (params: DeleteAloneInventoryInput) =>
      api.inventory.alone.deleteAloneInventory(params),
  );
  const { mutate: deleteAloneInventoryMutate } = useMutation(
    (deleteTogetherInventoryData: DeleteAloneInventoryData) => {
      return deleteAloneInventory(deleteTogetherInventoryData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAloneInventory');
      },
    },
  );
  const [isDragged, setIsDragged] = useState<boolean[]>(
    Array(data?.data.alonePackingList.length).fill(false),
  );

  if (!data) return null;

  console.log(data);

  const { alonePackingList, folder, currentFolder } = data.data;

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
    handleIsDragged(Array(alonePackingList?.length).fill(false));
    closeModal();
  };

  const onClickRightModalButton = () => {
    setIsDragged((prev) => prev.filter((_, i) => i !== selectedIndex));
    if (isDeleting) {
      deleteAloneInventoryMutate({
        folderId: currentFolder._id,
        listId: deleteList.join(','),
      });
      if (deleteList.length === alonePackingList.length) {
        setIsDeleting(false);
      }
      setDeleteList([]);
    } else {
      deleteAloneInventoryMutate({
        folderId: currentFolder._id,
        listId: alonePackingList[selectedIndex]._id,
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
      <Header back title="?????? ?????????" icon="profile" />
      <StyledRoot onTouchMove={() => setToggle(false)}>
        {showModal && (
          <Modal
            title="?????? ??????????????????????"
            closeModal={closeModal}
            button={
              <StyledModalButtonWrapper>
                <StyledModalButton left={true} onClick={onClickLeftModalButton}>
                  ?????????
                </StyledModalButton>
                <StyledModalButton onClick={onClickRightModalButton}>???</StyledModalButton>
              </StyledModalButtonWrapper>
            }
          />
        )}

        <StyledFolderInfo>
          <h1>{currentFolder.title}</h1>
          <div>
            <StyledToggleImage
              src={iShowMore}
              alt="????????????"
              width={24}
              height={24}
              toggle={toggle ? 'true' : 'false'}
              onClick={() => {
                setToggle(true);
              }}
            />
            {toggle && (
              <DropBox
                folderList={folder}
                closeDropBox={() => setToggle(false)}
                currentId={currentFolder._id}
                categoryName="alone"
              />
            )}
          </div>
        </StyledFolderInfo>

        <StyledMain isEmpty={!alonePackingList.length}>
          {!alonePackingList.length ? (
            <StyledEmpty>
              <p>&apos;+&apos; ????????? ??????</p>
              <p>?????? ???????????? ??????????????????</p>
            </StyledEmpty>
          ) : (
            <>
              <StyledCaptionWrapper>
                {!isDeleting && (
                  <StyledCaptionText>
                    <span>{alonePackingList?.length}</span>?????? ?????? ?????????
                  </StyledCaptionText>
                )}
                {isDeleting && (
                  <span
                    onClick={() => {
                      deleteList.length > 0 && setDeleteList([]);
                    }}
                  >
                    ?????? ??????
                  </span>
                )}

                <StyledCaptionButtonWrapper
                  onClick={() => {
                    setIsDragged(Array(alonePackingList?.length).fill(false));
                    setIsDeleting((prev) => !prev);
                    if (!isDeleting) {
                      setDeleteList([]);
                    }
                  }}
                >
                  {isDeleting ? (
                    <p onClick={() => setIsDragged(Array(alonePackingList?.length).fill(false))}>
                      ??????
                    </p>
                  ) : (
                    <Image
                      src={iTrash}
                      alt="??????"
                      width={24}
                      height={24}
                      onClick={() => setIsDragged(Array(alonePackingList?.length).fill(false))}
                    />
                  )}
                </StyledCaptionButtonWrapper>
              </StyledCaptionWrapper>

              <SwipeableList
                packingList={alonePackingList}
                deleteList={deleteList}
                isDeleting={isDeleting}
                checkDeleteList={checkDeleteList}
                handleIsDragged={handleIsDragged}
                openModal={openModal}
                setSelectedIndex={(id: number) => setSelectedIndex(id)}
                setDeleteList={(arr) => setDeleteList(arr)}
                isDragged={isDragged}
                routeToList={(idx: number) => {
                  router.push(`/alone/${alonePackingList[idx]._id}?invite=''`);
                }}
              />
            </>
          )}
        </StyledMain>
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
    font-style: ${FONT_STYLES.HEADLINE2_SEMIBOLD};
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const StyledToggleImage = styled(Image)<{ toggle: string }>`
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
  font-style: ${FONT_STYLES.HEADLINE1_MEDIUM};
`;
const StyledCaptionWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 8.4rem;

  & > span {
    position: absolute;
    font-style: ${FONT_STYLES.BODY2_SEMIBOLD};
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
    font-style: ${FONT_STYLES.BODY2_SEMIBOLD};
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
  font-style: ${FONT_STYLES.BODY4_SEMIBOLD};
`;

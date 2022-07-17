import SwipeableList from '../components/packingList/SwipeableList';
import styled from 'styled-components';
import Image from 'next/image';
import iShowMore from '../../public/assets/svg/iShowMore.svg';
import { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import DropBox from '../components/packingList/DropBox';
import useAPI from '../../utils/hooks/useAPI';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import iTrash from '../../public/assets/svg/iTrash.svg';
import Modal from '../components/common/Modal';
import { packmanColors } from '../../styles/color';

interface PackingList {
  id: string;
  departureDate: string;
  title: string;
  packTotalNum: number;
  packRemainNum: number;
}

function PackingList() {
  const [toggle, setToggle] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const getTogetherPackingList = useAPI((api) => api.packingList.alone.getPackingListWithFolders);
  const { data } = useQuery('packing-list', () => getTogetherPackingList(), {});
  const [isDragged, setIsDragged] = useState<boolean[]>(
    Array(data && data?.data.alonePackingList?.length).fill(false),
  );

  const router = useRouter();
  const queryClient = useQueryClient();

  if (!router.query.slug) return null;

  const categoryName = router.query.slug[0]; //together | alone
  const folderId = router.query.slug[1];

  if (!data) return null;
  //api alone/together 둘다 호출하고 categoryName에 따라 packingList에 할당하자.

  const { alonePackingList, folder, currentFolder } = data.data;
  const packingList = alonePackingList;

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

  return (
    <StyledRoot>
      <Header back title="패킹 리스트" icon="profile" />
      {showModal && (
        <Modal
          content="정말 삭제하시겠어요?"
          leftButtonContent="아니오"
          rightButtonContent="예"
          closeModal={closeModal}
          leftButtonFn={() => {
            handleIsDragged(Array(packingList?.length).fill(false));
            closeModal();
          }}
          rightButtonFn={() => {
            //togetherPackingListId params로 보내서 삭제
            setIsDragged((prev) => prev.filter((_, i) => i !== selectedIndex));
            // queryClient.setQueryData(
            //   'packing-list',
            //   packingList.filter((_, i) => i !== selectedIndex),
            // );
            console.log(queryClient.getQueryData('packing-list'));
            closeModal();
          }}
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
            toggle={toggle}
          />
          {toggle && (
            <DropBox
              folderList={folder}
              closeDropBox={() => setToggle(false)}
              currentId={currentFolder.id}
              categoryName={categoryName}
            />
          )}
        </div>
      </StyledFolderInfo>

      <StyledCaptionWrapper>
        {!isDeleting && (
          <StyledCaptionText>
            <span>{packingList?.length}</span>개의 패킹 리스트
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
            setIsDragged(Array(packingList?.length).fill(false));
            setIsDeleting((prev) => !prev);
            if (!isDeleting) {
              setDeleteList([]);
            }
          }}
        >
          {isDeleting ? (
            <p onClick={() => setIsDragged(Array(packingList?.length).fill(false))}>취소</p>
          ) : (
            <Image
              src={iTrash}
              alt="삭제"
              width={24}
              height={24}
              onClick={() => setIsDragged(Array(packingList?.length).fill(false))}
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
      />
    </StyledRoot>
  );
}

export default PackingList;

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
    font-size: 2rem;
    font-weight: 600;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const StyledToggleImage = styled(Image)<{ toggle: boolean }>`
  transition: 0.2s ease-in-out;
  transform: ${({ toggle }) => (toggle ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
const StyledCaptionWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 8.4rem;
  font-size: 1.2rem;
  font-weight: 300;

  & > span {
    position: absolute;
    font-size: 1.4rem;
    left: 2.6rem;
    bottom: 1rem;
    color: ${packmanColors.pmDeepGrey};
  }
`;
const StyledCaptionText = styled.p`
  display: flex;
  justify-content: start;
  padding: 1.8rem 0 0 2.4rem;
  margin: 0;
  font-size: 1.4rem;
  color: ${packmanColors.pmDarkGrey};
  & > span {
    font-weight: 600;
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

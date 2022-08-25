import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
interface PackingList {
  id: string;
  departureDate: string;
  title: string;
  packTotalNum: string;
  packRemainNum: string;
}

interface SwipeableListProps {
  packingList: PackingList[];
  deleteList: string[];
  isDeleting: boolean;
  openModal: () => void;
  setDeleteList: (arr: string[]) => void;
  swipeableListItem: React.ReactNode;
}

export default function SwipeableList(props: SwipeableListProps) {
  const { packingList, deleteList, isDeleting, openModal, setDeleteList, swipeableListItem } =
    props;

  const onClickDeleteButton = () => {
    if (packingList) {
      const payload = packingList.map(({ id }) => id);
      setDeleteList(payload);
    }
  };

  return (
    <StyledRoot>
      <StyledSwipeableListWrapper>{swipeableListItem}</StyledSwipeableListWrapper>

      {isDeleting && (
        <StyledButtonWrapper>
          <StyledDeleteButton>
            {!deleteList.length ? (
              <div onClick={onClickDeleteButton}>전체 선택</div>
            ) : deleteList.length === packingList?.length ? (
              <div onClick={openModal}>전체 삭제</div>
            ) : (
              <div onClick={openModal}>선택 삭제</div>
            )}
          </StyledDeleteButton>
        </StyledButtonWrapper>
      )}
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 20.5rem);
  gap: 0.8rem;
  background-color: #fff;
  overflow-y: auto;

  /* 브라우저별 스크롤바 숨김 설정 */
  -ms-overflow-style: none; // Edge
  scrollbar-width: none; // Firefox
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`;

const StyledSwipeableListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  margin-bottom: 9.7rem;
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

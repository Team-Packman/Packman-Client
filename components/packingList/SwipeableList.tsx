import styled from 'styled-components';
import SwipeablelistItem from './SwipeableListItem';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
interface PackingList {
  _id: string;
  departureDate: string;
  title: string;
  packTotalNum: number;
  packRemainNum: number;
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

  return (
    <StyledRoot>
      <StyledSwipeableListWrapper>{swipeableListItem}</StyledSwipeableListWrapper>

      {isDeleting && (
        <StyledButtonWrapper>
          <StyledDeleteButton>
            {!deleteList.length ? (
              <div
                onClick={() => {
                  const tempArr: string[] = [];
                  if (packingList) {
                    packingList.forEach(({ _id }) => tempArr.push(_id));
                  }
                  setDeleteList(tempArr);
                }}
              >
                전체 선택
              </div>
            ) : deleteList.length === packingList?.length ? (
              <div
                onClick={() => {
                  openModal();
                }}
              >
                전체 삭제
              </div>
            ) : (
              <div
                onClick={() => {
                  openModal();
                }}
              >
                선택 삭제
              </div>
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
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  gap: 0.8rem;
  background-color: #fff;
  overflow-y: auto;
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
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
  height: fit-content;
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
  font-style: ${FONT_STYLES.BODY4_SEMIBOLD};
  background-color: ${packmanColors.pmPink};
  color: #fff;
  border: none;
  border-radius: 0.5rem;
`;

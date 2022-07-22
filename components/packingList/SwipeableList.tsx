import styled from 'styled-components';
import SwipeablelistItem from './SwipeableListItem';
import { packmanColors } from '../../styles/color';
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
  checkDeleteList: (id: string) => void;
  handleIsDragged: (tmpArr: boolean[]) => void;
  openModal: () => void;
  setSelectedIndex: (id: number) => void;
  setDeleteList: (arr: string[]) => void;
  isDragged: boolean[];
}

export default function SwipeableList(props: SwipeableListProps) {
  const {
    packingList,
    deleteList,
    isDeleting,
    checkDeleteList,
    handleIsDragged,
    openModal,
    setSelectedIndex,
    setDeleteList,
    isDragged,
  } = props;

  return (
    <StyledRoot>
      <StyledSwipeableListWrapper>
        {packingList?.map((item, idx) => (
          <SwipeablelistItem
            key={item._id}
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
            packingList={packingList}
          />
        ))}
      </StyledSwipeableListWrapper>

      {isDeleting && (
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
      )}
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 0.8rem;
  background-color: #fff;
  overflow: hidden;
`;

const StyledSwipeableListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 9.7rem;
`;
const StyledDeleteButton = styled.button`
  position: fixed;
  bottom: 1.507rem;
  width: 100%;
  height: 4.7rem;
  font-size: 1.2rem;
  background-color: ${packmanColors.pmPink};
  color: #fff;
  border: none;
  border-radius: 0.5rem;
`;

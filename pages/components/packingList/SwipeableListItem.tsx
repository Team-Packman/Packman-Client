import styled from 'styled-components';
import iCheck from '../../../public/assets/svg/iCheck.svg';
import iCheckPink from '../../../public/assets/svg/iCheckPink.svg';
import iRightArrow from '../../../public/assets/svg/iRightArrow.svg';
import iDelete from '../../../public/assets/svg/iDelete.svg';
import Image from 'next/image';
import { packmanColors } from '../../../styles/color';

interface PackingList {
  id: string;
  departureDate: string;
  title: string;
  packTotalNum: number;
  packRemainNum: number;
}

interface ItemProps {
  idx: number;
  handleIsDragged: (tmpArr: boolean[]) => void;
  isDragged: boolean;
  isDeleting: boolean;
  deleteList: string[];
  checkDeleteList: (id: string) => void;
  onClickDeleteButton: (idx: number) => void;
  packingList: PackingList[];
}

export default function SwipeablelistItem(props: ItemProps) {
  const {
    idx,
    handleIsDragged,
    isDragged,
    isDeleting,
    deleteList,
    checkDeleteList,
    onClickDeleteButton,
    packingList,
  } = props;

  const { id, departureDate, title, packTotalNum, packRemainNum } = packingList[idx];

  const onTouchStart = (e: React.TouchEvent) => {
    const startX = e.targetTouches[0].clientX;
    let endX = e.targetTouches[0].clientX;

    function Move(e: TouchEvent) {
      endX = e.targetTouches[0].clientX;
    }
    function End() {
      let tmpArr = Array(packingList?.length).fill(false);

      if (startX > endX) {
        tmpArr = tmpArr.map((x, index) => (idx === index ? true : false));
      } else if (startX < endX) {
        tmpArr = Array(packingList?.length).fill(false);
      }
      handleIsDragged(tmpArr);

      document.removeEventListener('touchmove', Move);
      document.removeEventListener('touchend', End);
    }
    document.addEventListener('touchmove', Move);
    document.addEventListener('touchend', End);
  };

  return (
    <StyledRoot>
      {isDeleting && (
        <StyledSelectDelete>
          <StyledCheckImage
            src={deleteList.includes(id) ? iCheckPink : iCheck}
            alt="체크"
            onClick={() => checkDeleteList(id)}
          />
        </StyledSelectDelete>
      )}
      <StyledItemWrapper onTouchStart={onTouchStart} isDragged={isDragged} isDeleting={isDeleting}>
        <StyledItemInfo>
          <p>{departureDate}</p>
          <p>{title}</p>
          <StyledPackInfo>
            <span>총 {packTotalNum}개의 짐</span>
            <StyledPackRemainText>
              아직 <span>{packRemainNum}</span>개의 짐이 남았어요!
            </StyledPackRemainText>
          </StyledPackInfo>
        </StyledItemInfo>
        <Image src={iRightArrow} alt="열기" width={24} height={24} />
      </StyledItemWrapper>

      {!isDeleting && (
        <StyledDeleteButton
          isDragged={isDragged}
          onClick={() => {
            // 아이템 삭제
            onClickDeleteButton(idx);
          }}
        >
          <Image src={iDelete} alt="삭제" />
        </StyledDeleteButton>
      )}
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 33.6rem;
  height: 11.4rem;
`;

const StyledSelectDelete = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 2.9rem;
  min-width: 8.4rem;
  height: 2.4rem;
`;

const StyledCheckImage = styled(Image)`
  width: 2.4rem;
  height: 2.4rem;
  border: 0.1rem solid #000;
  border-radius: 50%;
`;

const StyledItemWrapper = styled.article<{ isDragged: boolean; isDeleting: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 33.6rem;
  height: inherit;
  padding: 1.41rem 0.4rem 1.9rem 1.832rem;
  border-radius: 1.5rem;
  background-color: ${packmanColors.pmBlueGrey};
  transition: 0.4s ease-in-out;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  transform: ${({ isDragged, isDeleting }) => {
    switch (isDeleting) {
      case false:
        return isDragged ? 'translateX(-6.4rem)' : 'translateX(0)';
    }
  }};
`;

const StyledItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 0.6rem;

  & > p:first-child {
    font-size: 1.4rem;
    color: ${packmanColors.pmDeepGrey};
    font-weight: 400;
  }
  & > p:nth-child(2) {
    font-weight: 600;
    font-size: 1.8rem;
  }
`;
const StyledPackInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 28.1rem;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8.3rem;
    height: 2.4rem;
    color: ${packmanColors.pmBlack};
    font-size: 1.3rem;
    font-weight: 400;
    border: 0.1rem solid ${packmanColors.pmPink};
    border-radius: 1.2rem;
    text-align: center;
  }
`;
const StyledPackRemainText = styled.p`
  font-weight: 400;
  font-size: 1.2rem;

  color: ${packmanColors.pmBlack};
  & > span {
    color: ${packmanColors.pmPink};
  }
`;

const StyledDeleteButton = styled.div<{ isDragged: boolean }>`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ isDragged }) => (isDragged ? '5.6rem' : '0rem')};
  height: 11.4rem;
  background-color: #ff0000;
  transition: 0.4s ease-in-out;
  opacity: ${({ isDragged }) => (isDragged ? '1' : '0')};
`;

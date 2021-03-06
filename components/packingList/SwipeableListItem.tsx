import styled from 'styled-components';
import iCheck from '/public/assets/svg/iCheck.svg';
import iCheckPink from '/public/assets/svg/iCheckPink.svg';
import iRightArrow from '/public/assets/svg/iRightArrow.svg';
import Image from 'next/image';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
import { useRouter } from 'next/router';

interface PackingList {
  _id: string;
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
  routeToList: (id: number) => void;
}

export default function SwipeablelistItem(props: ItemProps) {
  const router = useRouter();
  const {
    idx,
    handleIsDragged,
    isDragged,
    isDeleting,
    deleteList,
    checkDeleteList,
    onClickDeleteButton,
    packingList,
    routeToList,
  } = props;

  const { _id, departureDate, title, packTotalNum, packRemainNum } = packingList[idx];

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
    <StyledRoot onClick={() => routeToList(idx)}>
      {isDeleting && (
        <StyledSelectDelete>
          <Image
            src={deleteList.includes(_id) ? iCheckPink : iCheck}
            alt="??????"
            onClick={() => checkDeleteList(_id)}
            width={24}
            height={24}
          />
        </StyledSelectDelete>
      )}
      <StyledItemWrapper onTouchStart={onTouchStart} isDragged={isDragged} isDeleting={isDeleting}>
        <StyledItemInfo>
          <p>{departureDate}</p>
          <p>{title}</p>
          <StyledPackInfo>
            <span>??? {packTotalNum}?????? ???</span>
            <StyledPackRemainText>
              ?????? <span>{packRemainNum}</span>?????? ?????? ????????????!
            </StyledPackRemainText>
          </StyledPackInfo>
        </StyledItemInfo>
        <Image src={iRightArrow} alt="??????" width={24} height={24} />
      </StyledItemWrapper>

      {!isDeleting && (
        <StyledDeleteButton
          isDragged={isDragged}
          onClick={() => {
            // ????????? ??????
            onClickDeleteButton(idx);
          }}
        >
          <div>??????</div>
        </StyledDeleteButton>
      )}
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.6rem;
  height: 11.4rem;
  gap: 2.7rem;
`;

const StyledSelectDelete = styled.div`
  position: absolute;
  left: 3.288rem;
  display: flex;
  width: 8.4rem;
  height: 2.4rem;
`;

const StyledItemWrapper = styled.article<{ isDragged: boolean; isDeleting: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: inherit;
  padding: 1.41rem 0.4rem 1.9rem 1.832rem;
  border-radius: 1.5rem;
  background-color: ${packmanColors.pmBlueGrey};
  transition: ${({ isDeleting }) => !isDeleting && '0.4s ease-in-out'};

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  transform: ${({ isDragged, isDeleting }) => {
    switch (isDeleting) {
      case false:
        return isDragged ? 'translateX(-4.7rem)' : 'translateX(0)';
      default:
        return 'translateX(6.388rem)';
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
    font-style: ${FONT_STYLES.BODY1_REGULAR};
    color: ${packmanColors.pmBlueGrey};
  }
  & > p:nth-child(2) {
    font-style: ${FONT_STYLES.SUBHEAD2_SEMIBOLD};
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
    font-style: ${FONT_STYLES.BODY1_REGULAR};
    border: 0.1rem solid ${packmanColors.pmPink};
    border-radius: 1.2rem;
    text-align: center;
  }
`;
const StyledPackRemainText = styled.p`
  font-style: ${FONT_STYLES.BODY1_REGULAR};
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
  color: ${packmanColors.pmWhite};
  transition: 0.4s ease-in-out;
  opacity: ${({ isDragged }) => (isDragged ? '1' : '0')};
  padding: ${({ isDragged }) => isDragged && '0 1.4rem'};

  & > div {
    color: ${packmanColors.pmWhite};
    font-size: 1.6rem;
    font-weight: 600;
    flex-shrink: 0;
  }
`;

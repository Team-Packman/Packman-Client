import styled, { css } from 'styled-components';
import iCheck from '/public/assets/svg/iCheck.svg';
import iCheckPink from '/public/assets/svg/iCheckPink.svg';
import iRightArrow from '/public/assets/svg/iRightArrow.svg';
import Image from 'next/image';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
interface PackingList {
  id: string;
  departureDate: string;
  title: string;
  packTotalNum: string;
  packRemainNum: string;
}

interface ItemProps {
  idx: number;
  handleIsDragged: (tmpArr: boolean[]) => void;
  isDragged: boolean[];
  isDeleting: boolean;
  deleteList: string[];
  checkDeleteList: (id: string) => void;
  onClickDeleteButton: (idx: number) => void;
  packingList: PackingList[];
  moveToPackingList: () => void;
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
    moveToPackingList,
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

      if (startX - endX > 100) {
        tmpArr = tmpArr.map((_, index) => (idx === index ? true : false));
        handleIsDragged(tmpArr);
      } else {
        if (isDragged[idx]) {
          handleIsDragged(tmpArr);
        }
      }

      document.removeEventListener('touchmove', Move);
      document.removeEventListener('touchend', End);
    }
    document.addEventListener('touchmove', Move);
    document.addEventListener('touchend', End);
  };

  return (
    <StyledRoot isDeleting={isDeleting}>
      {isDeleting && (
        <StyledSelectDelete>
          <Image
            src={deleteList.includes(id) ? iCheckPink : iCheck}
            alt="check"
            onClick={() => checkDeleteList(id)}
            layout="fill"
          />
        </StyledSelectDelete>
      )}
      <StyledItemWrapper
        onTouchStart={onTouchStart}
        isDragged={isDragged[idx]}
        isDeleting={isDeleting}
        onClick={moveToPackingList}
      >
        <StyledItemInfo>
          <p>{departureDate}</p>
          <p>{title}</p>
          <StyledPackInfo>
            <span>총 {packTotalNum}개의 짐</span>
            {packRemainNum ? (
              <StyledPackRemainText>
                아직 <span>{packRemainNum}</span>개의 짐이 남았어요!
              </StyledPackRemainText>
            ) : (
              <StyledPackRemainText>
                <span>패킹</span>이 완료되었어요!
              </StyledPackRemainText>
            )}
          </StyledPackInfo>
        </StyledItemInfo>
        <Image src={iRightArrow} alt="right-arrow" width={24} height={24} />
      </StyledItemWrapper>

      {!isDeleting && (
        <StyledDeleteButton
          isDragged={isDragged[idx]}
          onClick={() => {
            // 아이템 삭제
            onClickDeleteButton(idx);
          }}
        >
          <div>삭제</div>
        </StyledDeleteButton>
      )}
    </StyledRoot>
  );
}

const StyledRoot = styled.div<{ isDeleting: boolean }>`
  position: relative;
  display: flex;
  justify-content: ${({ isDeleting }) => !isDeleting && 'center'};
  align-items: center;
  width: 100%;
  height: 10.8rem;
  gap: 2.7rem;
  padding: 0 2rem;
  overflow: hidden;
`;

const StyledSelectDelete = styled.div`
  position: absolute;
  left: 3.288rem;
  width: 2.4rem;
  height: 2.4rem;
`;

const StyledItemWrapper = styled.article<{ isDragged: boolean; isDeleting: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100vw - 4rem);
  overflow-x: hidden;
  height: inherit;
  padding: 1.41rem 0.4rem 1.9rem 1.832rem;
  border-radius: 1.5rem;
  background-color: ${packmanColors.pmBlueGrey};
  transition: ease-in-out;
  transition-duration: 0.4s;
  -webkit-transition: ease-in-out;
  -webkit-transition-duration: 0.4s;

  /* 드래그했을 때 아이템이 딸려오는 현상 방지 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${({ isDragged, isDeleting }) => {
    switch (isDeleting) {
      case false:
        return isDragged
          ? css`
              transform: translateX(-4.7rem);
              -webkit-transform: 0.4s translateX(-4.7rem);
            `
          : css`
              transform: translateX(0);
              -webkit-transform: 0.4s translateX(0);
            `;
      default:
        return css`
          transform: translateX(6.388rem);
          -webkit-transform: translateX(6.388rem); // Safari 대응
        `;
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
    ${FONT_STYLES.BODY1_REGULAR};
    color: ${packmanColors.pmDeepGrey};
  }
  & > p:nth-child(2) {
    ${FONT_STYLES.SUBHEAD2_SEMIBOLD};
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
    ${FONT_STYLES.BODY1_REGULAR};
    border: 0.1rem solid ${packmanColors.pmPink};
    border-radius: 1.2rem;
    text-align: center;
  }
`;
const StyledPackRemainText = styled.p`
  position: absolute;
  right: 3.557rem;
  ${FONT_STYLES.BODY1_REGULAR};
  color: ${packmanColors.pmBlack};
  & > span {
    font-weight: bold;
    color: ${packmanColors.pmPink};
  }
`;

const StyledDeleteButton = styled.div<{ isDragged: boolean }>`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.6rem;
  height: 11.4rem;
  background-color: #ff0000;
  color: ${packmanColors.pmWhite};
  transition: 0.4s ease-in-out;
  -webkit-transition: 0.4s ease-in-out;
  transform: ${({ isDragged }) => (isDragged ? 'translateX(0rem)' : 'translateX(5.6rem)')};
  -webkit-transform: ${({ isDragged }) => (isDragged ? 'translateX(0rem)' : 'translateX(5.6rem)')};
  opacity: ${({ isDragged }) => (isDragged ? '1' : '0')};

  & > div {
    color: ${packmanColors.pmWhite};
    font-size: 1.6rem;
    font-weight: 600;
    flex-shrink: 0;
  }
`;

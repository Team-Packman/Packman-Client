import styled, { css } from 'styled-components';
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

  const moveToPackingList = () => {
    if (!isDeleting) {
      router.push(`/together/${packingList[idx]._id}`);
    }
  };

  return (
    <StyledRoot isDeleting={isDeleting}>
      {isDeleting && (
        <StyledSelectDelete>
          <Image
            src={deleteList.includes(_id) ? iCheckPink : iCheck}
            alt="체크"
            onClick={() => checkDeleteList(_id)}
            width={24}
            height={24}
            layout="fixed"
          />
        </StyledSelectDelete>
      )}
      <StyledItemWrapper
        onTouchStart={onTouchStart}
        isDragged={isDragged}
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
  overflow: hidden;
`;

const StyledSelectDelete = styled.div`
  position: absolute;
  left: 3.288rem;
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
  transition: 0.4s ease-in-out;

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
            `
          : css`
              transform: translateX(0);
            `;
      default:
        return css`
          animation: 0.4s ease-in-out slide;
          transform: translateX(8.388rem);
        `;
    }
  }};

  @keyframes slide {
    from {
      transform: translateX(2rem);
    }
    to {
      transform: translateX(8.388rem);
    }
  }
`;

const StyledItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 0.6rem;

  & > p:first-child {
    ${FONT_STYLES.BODY1_REGULAR};
    color: ${packmanColors.pmBlueGrey};
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
  width: ${({ isDragged }) => (isDragged ? '5.6rem' : '0rem')};
  height: 11.4rem;
  background-color: #ff0000;
  color: ${packmanColors.pmWhite};
  transition: 0.4s ease-in-out;
  opacity: ${({ isDragged }) => (isDragged ? '1' : '0')};

  & > div {
    color: ${packmanColors.pmWhite};
    font-size: 1.6rem;
    font-weight: 600;
    flex-shrink: 0;
  }
`;

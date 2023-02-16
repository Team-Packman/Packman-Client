import styled, { css } from 'styled-components';
import iCheck from '/public/assets/svg/iCheck.svg';
import iCheckPink from '/public/assets/svg/iCheckPink.svg';
import iRightArrow from '/public/assets/svg/iRightArrow.svg';
import Image from 'next/image';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
import Link from 'next/link';
import { useRouter } from 'next/router';
interface PackingList {
  id: string;
  departureDate: string;
  title: string;
  packTotalNum: string;
  packRemainNum: string;
}

interface ItemProps {
  swipe: (item?: string) => void;
  isSwiped: Set<string>;
  isDeletingMode: boolean;
  deleteList: Set<string>;
  modifyDeleteList: (id: string) => void;
  packingList: PackingList;
  deleteSingleListItem: (id: string) => void;
}

export default function SwipeablelistItem(props: ItemProps) {
  const {
    swipe,
    isSwiped,
    isDeletingMode,
    deleteList,
    modifyDeleteList,
    packingList,
    deleteSingleListItem,
  } = props;

  const { id, departureDate, title, packTotalNum, packRemainNum } = packingList;
  const router = useRouter();
  const { type } = router.query;

  const onTouchStart = (e: React.TouchEvent) => {
    let isSwiping = false;
    let isScrolling = false;

    const startX = e.targetTouches[0].clientX;
    const startY = e.targetTouches[0].clientY;

    function Move(e: TouchEvent) {
      if (isSwiping) return;

      const endX = e.targetTouches[0].clientX;
      const endY = e.targetTouches[0].clientY;

      // 기울기 40~45도 이상으로 대각선 스와이핑하면 수직 스와이핑 실행
      if (Math.abs((startY - endY) / (startX - endX)) > 0.25) {
        swipe();
        isScrolling = true;
        return;
      }
      //  아이템의 우측하단에서 좌측상단으로 대각선 스와이핑 했을 때는 열림

      if (isScrolling) return; // 수직 스와이핑 중이면 좌우 스와이핑 방지

      // 수평으로 스와이프해서 아이템을 여는 경우
      if (startX - endX > 0) {
        isSwiping = true;
        open();
      }
      if (endX - startX > 0) {
        close();
      }
    }
    function End() {
      document.removeEventListener('touchmove', Move);
      document.removeEventListener('touchend', End);
    }
    document.addEventListener('touchmove', Move);
    document.addEventListener('touchend', End);
  };

  const open = () => {
    swipe(id);
  };

  const close = () => {
    if (isSwiped.has(id)) {
      swipe(id);
    }
  };

  return (
    <StyledRoot isDeletingMode={isDeletingMode}>
      {isDeletingMode && (
        <StyledSelectDelete>
          <Image
            src={deleteList.has(id) ? iCheckPink : iCheck}
            alt="check"
            onClick={() => modifyDeleteList(id)}
            layout="fill"
          />
        </StyledSelectDelete>
      )}
      <Link href={!isDeletingMode && !isSwiped.size ? `/${type}?id=${id}` : '#'}>
        <StyledItemWrapper
          onTouchStart={onTouchStart}
          isSwiped={isSwiped.has(id)}
          isDeletingMode={isDeletingMode}
          onClick={() => {
            swipe();
            modifyDeleteList(id);
          }}
        >
          <StyledItemInfo>
            <p>{departureDate}</p>
            <p>{title}</p>
            <StyledPackInfo>
              <span>총 {packTotalNum}개의 짐</span>
              {packRemainNum !== '0' ? (
                <StyledPackRemainText>
                  아직 <span>{packRemainNum}</span>개의 짐이 남았어요!
                </StyledPackRemainText>
              ) : (
                packTotalNum !== '0' &&
                packRemainNum === '0' && (
                  <StyledPackRemainText>
                    <span>패킹</span>이 완료되었어요!
                  </StyledPackRemainText>
                )
              )}
            </StyledPackInfo>
          </StyledItemInfo>
          <StyledArrowImage>
            <Image
              src={iRightArrow}
              width={2.4}
              height={2.4}
              alt="right-arrow"
              layout="responsive"
            />
          </StyledArrowImage>
        </StyledItemWrapper>
      </Link>

      {!isDeletingMode && (
        <StyledDeleteButton
          isSwiped={isSwiped.has(id)}
          onClick={() => {
            // 아이템 삭제
            deleteSingleListItem(id);
          }}
        >
          <div>삭제</div>
        </StyledDeleteButton>
      )}
    </StyledRoot>
  );
}

const StyledRoot = styled.div<{ isDeletingMode: boolean }>`
  position: relative;
  display: flex;
  justify-content: ${({ isDeletingMode }) => !isDeletingMode && 'center'};
  align-items: center;
  width: 100%;
  height: 10.8rem;
  padding: 0 2rem;
  overflow: hidden;
  touch-action: pan-x;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const StyledSelectDelete = styled.div`
  position: absolute;
  left: 3.288rem;
  width: 2.4rem;
  height: 2.4rem;
`;

const StyledItemWrapper = styled.article<{ isSwiped: boolean; isDeletingMode: boolean }>`
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

  ${({ isSwiped, isDeletingMode }) => {
    switch (isDeletingMode) {
      case false:
        return isSwiped
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
const StyledArrowImage = styled.div`
  width: 2.4rem;
  height: 2.4rem;
`;
const StyledItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  & > p {
    &:not(:last-child) {
      padding-bottom: 0.6rem;
    }
  }

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

const StyledDeleteButton = styled.div<{ isSwiped: boolean }>`
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
  transform: ${({ isSwiped }) => (isSwiped ? 'translateX(0rem)' : 'translateX(5.6rem)')};
  -webkit-transform: ${({ isSwiped }) => (isSwiped ? 'translateX(0rem)' : 'translateX(5.6rem)')};
  opacity: ${({ isSwiped }) => (isSwiped ? '1' : '0')};

  & > div {
    color: ${packmanColors.pmWhite};
    font-size: 1.6rem;
    font-weight: 600;
    flex-shrink: 0;
  }
`;

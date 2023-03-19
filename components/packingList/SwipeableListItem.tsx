import styled, { css } from 'styled-components';
import iCheck from '/public/assets/svg/iCheck.svg';
import iCheckPink from '/public/assets/svg/iCheckPink.svg';
import iRightArrow from '/public/assets/svg/iRightArrow.svg';
import Image from 'next/image';
import { packmanColors } from '../../styles/color';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Chip from '../common/Chip';
import Card from '../common/Card';
import { Utility } from '../../utils/Utility';

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

export default function SwipeableListItem(props: ItemProps) {
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
          <Card overlay={cardContainerStyle}>
            <Card.LeftContainer overlay={leftContainerStyle}>
              <Card.Label value={departureDate} />
              <Card.Title value={title} />
              <Card.SubTitle>
                <Chip text={`총 ${packTotalNum}개의 짐`} />
              </Card.SubTitle>
            </Card.LeftContainer>
            <Card.RightContainer overlay={rightContainerStyle}>
              <Card.Description overlay={descriptionStyle}>
                {Utility.getRemainPackDesc(packRemainNum, departureDate)}
              </Card.Description>
            </Card.RightContainer>
            <Card.Icon icon={iRightArrow} />
          </Card>
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
  width: 100%;
  overflow-x: hidden;
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

const cardContainerStyle = css`
  height: 10.4rem;
  margin: 0;
  padding: 1.4rem 0 1.4rem 2rem;
`;

const leftContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  & > p {
    &:not(:last-child) {
      padding-bottom: 0.6rem;
    }
  }
`;

const rightContainerStyle = css`
  display: flex;
  justify-content: flex-end;

  width: 100%;
`;

const descriptionStyle = css`
  & > span {
    & > em {
      color: ${packmanColors.pmPink};
    }
  }
`;

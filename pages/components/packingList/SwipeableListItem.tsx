import styled from 'styled-components';
import iCheck from '../../../public/assets/svg/iCheck.svg';
import iRightArrow from '../../../public/assets/svg/iRightArrow.svg';
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
            src={iCheck}
            alt="체크"
            ischecked={deleteList.includes(id)}
            onClick={() => checkDeleteList(id)}
          />
        </StyledSelectDelete>
      )}
      <StyledItemWrapper onTouchStart={onTouchStart} isDragged={isDragged} isDeleting={isDeleting}>
        <StyledItemInfo>
          <p>{departureDate}</p>
          <p>{title}</p>
          <span>총 {packTotalNum}개의 짐</span>
        </StyledItemInfo>
        <StyledPackRemainText>
          아직 <span>{packRemainNum}</span>개의 짐이 남았어요!
        </StyledPackRemainText>
        <Image src={iRightArrow} alt="열기" width={24} height={24} />
      </StyledItemWrapper>
      {!isDeleting && (
        <StyledDeleteButton
          isDragged={isDragged}
          onClick={() => {
            // console.log('아이템 삭제');
            onClickDeleteButton(idx);
          }}
        >
          <div>삭제</div>
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

const StyledCheckImage = styled(Image)<{ ischecked: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  border: 0.1rem solid #000;
  border-radius: 50%;
  background-color: ${({ ischecked }) => (ischecked ? 'green' : '#fff')};
`;

const StyledItemWrapper = styled.article<{ isDragged: boolean; isDeleting: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 33.6rem;
  height: inherit;
  padding: 1.41rem 0.4rem 1.9rem 1.832rem;
  border-radius: 1.5rem;
  background-color: ${packmanColors.blueGray};
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
  gap: 0.6rem;

  & > p:first-child {
    font-size: 1.4rem;
    color: ${packmanColors.lightGray};
    font-weight: 300;
  }
  & > p:nth-child(2) {
    font-weight: 500;
    font-size: 1.8rem;
  }
  & > span {
    width: 8.3rem;
    height: 2.4rem;
    background-color: #fff;
    color: ${packmanColors.black};
    font-size: 1.3rem;
    font-weight: 400;
    border: 0.1rem solid ${packmanColors.pink};
    border-radius: 1.2rem;
    text-align: center;
  }
`;
const StyledPackRemainText = styled.p`
  position: absolute;
  right: 3.557rem;
  font-weight: 400;
  font-size: 1.3rem;
  color: ${packmanColors.black};
  & > span {
    color: ${packmanColors.pink};
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
  color: ${packmanColors.white};
  transition: 0.4s ease-in-out;
  font-size: 1.4rem;
  font-weight: 500;
  opacity: ${({ isDragged }) => (isDragged ? '1' : '0')};

  & > div {
    flex-shrink: 0;
  }
`;

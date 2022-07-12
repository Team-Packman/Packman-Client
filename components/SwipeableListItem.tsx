import styled from 'styled-components';
import iCheck from '../public/assets/svg/iCheck.svg';
import iRightArrow from '../public/assets/svg/iRightArrow.svg';
import Image from 'next/image';
import { packmanColors } from '../styles/color';

interface ItemProps {
  idx: number;
  handleIsDragged: (tmpArr: boolean[]) => void;
  isDragged: boolean;
  isDeleting: boolean;
  deleteList: string[];
  checkDeleteList: (id: string) => void;
}

const packingList = [
  {
    id: '62bbb80d9d5dc1aa4c3d2839',
    departureDate: '2021.08.15',
    title: '혼자 밀라노 여행',
    packTotalNum: 20,
  },
  {
    id: '62bbb80d9d5dc1aa4c3d2839',
    departureDate: '2021.03.01',
    title: '미국 할리우드 여행',
    packTotalNum: 20,
  },
  {
    id: '62bbb80d9d5dc1aa4c3d2839',
    departureDate: '2021.08.15',
    title: '크리스마스 캐나다 여행',
    packTotalNum: 20,
  },
  {
    id: '62bbb80d9d5dc1aa4c3d2839',
    departureDate: '2021.08.15',
    title: '생일 일본 여행',
    packTotalNum: 15,
  },
];

export default function SwipeablelistItem(props: ItemProps) {
  const { idx, handleIsDragged, isDragged, isDeleting, deleteList, checkDeleteList } = props;
  const { id, departureDate, title, packTotalNum } = packingList[idx];

  const onTouchStart = (e: React.TouchEvent) => {
    const startX = e.targetTouches[0].clientX;
    let endX = e.targetTouches[0].clientX;

    function Move(e: TouchEvent) {
      endX = e.targetTouches[0].clientX;
    }
    function End() {
      let tmpArr = Array(packingList?.length).fill(false);

      if (startX > endX) {
        for (let i = 0; i < tmpArr.length; i++) {
          if (i === idx) tmpArr[i] = true;
          else tmpArr[i] = false;
        }
      } else if (startX < endX) {
        tmpArr = Array(packingList?.length).fill(false);
      }
      handleIsDragged(tmpArr);

      document.removeEventListener('touchmove', Move);
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
            isChecked={deleteList.includes(id)}
            onClick={() => checkDeleteList(id)}
          />
        </StyledSelectDelete>
      )}
      <StyledItemWrapper onTouchStart={onTouchStart} isDragged={isDragged}>
        <StyledItemInfo>
          <p>{departureDate}</p>
          <p>{title}</p>
          <span>{packTotalNum}개의 짐</span>
        </StyledItemInfo>
        <Image src={iRightArrow} alt="열기" width={10} height={20} />
      </StyledItemWrapper>
      {!isDeleting && <StyledDeleteButton isDragged={isDragged}>삭제</StyledDeleteButton>}
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 33.5rem;
  height: 11.4rem;
  overflow: hidden;
`;

const StyledSelectDelete = styled.div`
  display: flex;
  justify-content: center;
  width: 7.8rem;
  height: 2.4rem;
`;

const StyledCheckImage = styled(Image)<{ isChecked: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  border: 0.1rem solid #000;
  border-radius: 50%;
  background-color: ${({ isChecked }) => (isChecked ? 'green' : '#fff')};
`;

const StyledItemWrapper = styled.article<{ isDragged: boolean }>`
  transform: ${({ isDragged }) => (isDragged ? 'translateX(-7rem)' : 'translateX(0)')};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.5rem;
  height: inherit;
  padding: 2.1rem 1.8rem 2.1rem 2.5rem;
  border-radius: 1.5rem;
  background-color: #fff;
  transition: 0.4s ease-in-out;
  z-index: 1;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const StyledItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;

  & > span {
    width: fit-content;
    height: 2rem;
    background-color: #fff;
    color: ${packmanColors.mint};
    font-size: 1.2rem;
    border: 0.1rem solid ${packmanColors.mint};
    border-radius: 1rem;
    padding: 0 1rem;
    text-align: center;
  }
  & > p:first-child {
    font-size: 1.2rem;
    color: ${packmanColors.lightGray};
  }
  & > p:nth-child(2) {
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

const StyledDeleteButton = styled.div<{ isDragged: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 7.3rem; */
  height: 11.4rem;
  width: ${({ isDragged }) => (isDragged ? '7.3rem' : '0px')};
  height: inherit;
  background-color: #ff0000;
  color: ${packmanColors.white};
  border-radius: 15px;
  transition: 0.4s ease-in-out;
  z-index: 0;
  right: 0;
  /* right: ${({ isDragged }) => (!isDragged ? '-52px' : '0px')}; */
  opacity: ${({ isDragged }) => (isDragged ? '1' : '0')};
`;

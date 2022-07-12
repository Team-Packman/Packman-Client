import 'react-swipeable-list/dist/styles.css';
import { SwipeableList } from 'react-swipeable-list';
import styled from 'styled-components';
import { useState } from 'react';
import Image from 'next/image';
import iTrash from '../public/assets/svg/iTrash.svg';
import SwipeablePackingListItem from './SwipeablePackingListItem';

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

function SwipeablePackingList() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);

  const checkDeleteList = (id: string) => {
    () => {
      if (deleteList.includes(id)) {
        setDeleteList((prev) => prev.filter((idx) => idx !== id));
      } else {
        setDeleteList([...deleteList, id]);
      }
    };
  };

  return (
    <StyledRoot>
      <SwipeableList fullSwipe={true}>
        <StyledCaptionWrapper>
          <p>{packingList.length}개의 패킹 리스트</p>
          {isDeleting && (
            <span
              onClick={() => {
                deleteList.length > 0 && setDeleteList([]);
              }}
            >
              선택해제
            </span>
          )}

          <StyledCaptionButtonWrapper
            onClick={() => {
              setIsDeleting((prev) => !prev);
              if (!isDeleting) {
                setDeleteList([]);
              }
            }}
          >
            {isDeleting ? <p>취소</p> : <Image src={iTrash} alt="삭제" width={24} height={24} />}
          </StyledCaptionButtonWrapper>
        </StyledCaptionWrapper>

        <StyledSwipeableListWrapper>
          {packingList.map((packingItem) => (
            <SwipeablePackingListItem
              key={packingItem.id}
              packingItem={packingItem}
              isDeleting={isDeleting}
              deleteList={deleteList}
              checkDeleteList={(id: string) => checkDeleteList(id)}
            />
          ))}
          {isDeleting && (
            <StyledDeleteButton isCheckedAtLeastOne={deleteList.length > 0}>
              {!deleteList.length ? (
                <div
                  onClick={() => {
                    const tempArr: string[] = [];
                    if (packingList) {
                      packingList.forEach(({ id }) => tempArr.push(id));
                    }
                    setDeleteList(tempArr);
                  }}
                >
                  전체 선택
                </div>
              ) : (
                <div
                  onClick={() => {
                    console.log('삭제');
                  }}
                >
                  삭제
                </div>
              )}
            </StyledDeleteButton>
          )}
        </StyledSwipeableListWrapper>
      </SwipeableList>
    </StyledRoot>
  );
}

export default SwipeablePackingList;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 37.5rem;
  height: 66.9rem;
  gap: 1rem;
  background-color: #ececec;
  overflow: hidden;
`;
const StyledCaptionWrapper = styled.div`
  position: relative;
  display: flex;
  width: 37.5rem;
  height: 8.4rem;
  font-size: 1.2rem;

  & > span {
    position: absolute;
    font-size: 1.4rem;
    left: 2.6rem;
    bottom: 1rem;
    color: #808080;
  }
  & > p {
    display: flex;
    justify-content: start;
    padding: 1.8rem 0 0 2rem;
    color: #808080;
    font-size: 1.2rem;
    margin: 0;
  }
`;
const StyledCaptionButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  right: 2rem;
  bottom: 0.9rem;
  & > p {
    color: #808080;
    margin: 0;
  }
`;
const StyledSwipeableListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledDeleteButton = styled.button<{ isCheckedAtLeastOne: boolean }>`
  width: 100%;
  height: 4.7rem;
  font-size: 1.2rem;
  background-color: ${({ isCheckedAtLeastOne }) => (isCheckedAtLeastOne ? '#fff' : '#30CCD8')};
  color: ${({ isCheckedAtLeastOne }) => (isCheckedAtLeastOne ? '#30CCD8' : '#fff')};
  border: ${({ isCheckedAtLeastOne }) => (isCheckedAtLeastOne ? '1px solid #30CCD8' : 'none')};
  border-radius: 0.5rem;
`;

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SwipeablelistItem from './SwipeableListItem';
import Image from 'next/image';
import iTrash from '../public/assets/svg/iTrash.svg';
import { packmanColors } from '../styles/color';

export default function SwipeableList() {
  let packingList = [
    {
      id: '62bbb80d9d5dc1aa4c3d2839',
      departureDate: '2021.08.15',
      title: '혼자 밀라노 여행',
      packTotalNum: 20,
    },
    {
      id: '62bbb80d9d5dc1aa4c3d2831',
      departureDate: '2021.03.01',
      title: '미국 할리우드 여행',
      packTotalNum: 20,
    },
    {
      id: '62bbb80d9d5dc1aa4c3d2832',
      departureDate: '2021.08.15',
      title: '크리스마스 캐나다 여행',
      packTotalNum: 20,
    },
    {
      id: '62bbb80d9d5dc1aa4c3d2833',
      departureDate: '2021.08.15',
      title: '생일 일본 여행',
      packTotalNum: 15,
    },
  ];

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);

  const checkDeleteList = (id: string) => {
    if (deleteList.includes(id)) {
      setDeleteList((prev) => prev.filter((idx) => idx !== id));
    } else {
      setDeleteList([...deleteList, id]);
    }
  };
  const [isDragged, setIsDragged] = useState<boolean[]>(Array(packingList?.length).fill(false));

  const handleIsDragged = (tmpArr: boolean[]) => {
    setIsDragged(tmpArr);
  };

  const onClickDeleteButton = (idx: number) => {
    setIsDragged((prev) => prev.filter((_, i) => i !== idx));
    packingList = packingList.filter((_, i) => i !== idx);
    console.log(packingList);
  };

  return (
    <StyledRoot>
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
            setIsDragged(Array(packingList?.length).fill(false));
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
        {packingList?.map((_, idx) => (
          <SwipeablelistItem
            idx={idx}
            key={idx}
            isDragged={isDragged[idx]}
            handleIsDragged={(tmpArr: boolean[]) => handleIsDragged(tmpArr)}
            isDeleting={isDeleting}
            deleteList={deleteList}
            checkDeleteList={(id: string) => checkDeleteList(id)}
            onClickDeleteButton={() => onClickDeleteButton(idx)}
          />
        ))}
      </StyledSwipeableListWrapper>
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
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 66.9rem; */
  gap: 1rem;
  background-color: #ececec;
  overflow: hidden;
`;

const StyledCaptionWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 8.4rem;
  font-size: 1.2rem;

  & > span {
    position: absolute;
    font-size: 1.4rem;
    left: 2.6rem;
    bottom: 1rem;
    color: ${packmanColors.lightGray};
  }
  & > p {
    display: flex;
    justify-content: start;
    padding: 1.8rem 0 0 2.4rem;
    color: ${packmanColors.lightGray};
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
    color: ${packmanColors.lightGray};
  }
`;
const StyledSwipeableListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
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

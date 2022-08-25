import styled from 'styled-components';

interface SwipeableListProps {
  swipeableListItem: React.ReactNode;
}

export default function SwipeableList(props: SwipeableListProps) {
  const { swipeableListItem } = props;

  return (
    <StyledRoot>
      <StyledSwipeableListWrapper>{swipeableListItem}</StyledSwipeableListWrapper>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 20.5rem);
  gap: 0.8rem;
  background-color: #fff;
  overflow-y: auto;

  /* 브라우저별 스크롤바 숨김 설정 */
  -ms-overflow-style: none; // Edge
  scrollbar-width: none; // Firefox
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`;

const StyledSwipeableListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  margin-bottom: 9.7rem;
`;

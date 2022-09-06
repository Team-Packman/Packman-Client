import styled from 'styled-components';

interface SwipeableListProps {
  swipeableListItem: React.ReactNode;
  isSwiped: boolean;
}

export default function SwipeableList(props: SwipeableListProps) {
  const { swipeableListItem, isSwiped } = props;

  return (
    <StyledRoot isSwiped={isSwiped}>
      <StyledSwipeableListWrapper>{swipeableListItem}</StyledSwipeableListWrapper>
    </StyledRoot>
  );
}

const StyledRoot = styled.div<{ isSwiped: boolean }>`
  flex-grow: 1;
  background-color: #fff;
  overflow-y: ${({ isSwiped }) => (isSwiped ? 'hidden' : 'auto')};

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
  width: 100%;
  margin-bottom: 9.7rem;
`;

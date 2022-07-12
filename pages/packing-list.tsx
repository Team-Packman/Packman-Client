import SwipeableList from '../components/SwipeableList';
import styled from 'styled-components';
// import useAPI from '../utils/hooks/useAPI';
function PackingList() {
  return (
    <StyledRoot>
      <StyledFolderInfo>
        <h1>해외여행</h1>
        <button>상세보기</button>
      </StyledFolderInfo>
      <SwipeableList />
    </StyledRoot>
  );
}

/*interface Pack {
  id: number;
  date: string;
  title: string;
  bag: number;
} */

export default PackingList;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledFolderInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-end;
  padding: 0 2rem 1.5rem 2rem;
  width: 100%;
  height: 100%;
  gap: 1rem;
  & > h1 {
    font-size: 2rem;
  }
`;

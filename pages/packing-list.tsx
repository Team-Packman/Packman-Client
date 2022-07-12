import SwipeablePackingList from '../components/SwipeablePackingList';
import SwipeableList from '../components/SwipeableList';
import styled from 'styled-components';
// import useAPI from '../utils/hooks/useAPI';
function PackingList() {
  //   const { isLoading, data, error } = useQuery('packingList', async () => {
  //     const { data } = await axios.get('api/pack');
  //     return data;
  //   });
  return (
    <StyledRoot>
      <StyledFolderInfo>
        <h1>해외여행</h1>
        <button>상세보기</button>
      </StyledFolderInfo>
      {/* <SwipeablePackingList /> */}
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
  padding: 0 2rem;
`;
const StyledFolderInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-end;
  padding-bottom: 1.5rem;
  width: 100%;
  height: 6.7rem;
  gap: 1rem;
  & > h1 {
    font-size: 2rem;
  }
`;

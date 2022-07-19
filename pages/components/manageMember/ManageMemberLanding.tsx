import Header from '../../../components/common/Header';
import styled from 'styled-components';
import { packmanColors } from '../../../styles/color';
import Members from './Members';
import useAPI from '../../../utils/hooks/useAPI';
import { useQuery } from 'react-query';

function ManageMemberLanding() {
  const getGroupMembers = useAPI(
    (api) => (groupId: string) => api.packingList.together.getGroupMembers(groupId),
  );
  const { data } = useQuery('group-members', () => getGroupMembers('3'));
  if (!data) return null;

  return (
    <>
      <Header back title="멤버 관리" />
      <StyledRoot>
        <StyledBanner>
          <div>
            <h1>크리스마스캐나다여행</h1>
            <p>2022.08.26</p>
          </div>
          <div>D-7</div>
        </StyledBanner>
        <Members members={data.data.members} />
      </StyledRoot>
    </>
  );
}

export default ManageMemberLanding;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
`;
const StyledBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 33.6rem;
  height: 8.4rem;
  border-radius: 0.8rem;
  padding: 2rem 1.849rem 1.5rem 2.067rem;
  background-color: ${packmanColors.pmBlueGrey};

  & > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    & > h1 {
      font-weight: 600;
      font-size: 1.8rem;
      color: ${packmanColors.pmBlack};
    }
    & > p {
      font-weight: 400;
      font-size: 1.4rem;
      color: ${packmanColors.pmDeepGrey};
    }
  }
  & > div:nth-child(2) {
    font-weight: 800;
    font-size: 2.8rem;
    color: ${packmanColors.pmGreen};
  }
`;

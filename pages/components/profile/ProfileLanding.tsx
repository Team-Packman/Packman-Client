import CreateProfile from './CreateProfile';
import Header from '../../../components/common/Header';
import styled from 'styled-components';

function ProfileLanding() {
  return (
    <StyledRoot>
      <Header />
      <CreateProfile
        comment={
          <>
            <h1>환영합니다 :^)</h1>
            <h1>
              <b>팩맨</b>에서 사용하실 <b>프로필</b>을
            </h1>
            <h1>완성해주세요.</h1>
          </>
        }
      />
    </StyledRoot>
  );
}

export default ProfileLanding;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
`;

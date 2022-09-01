import CreateProfile from './CreateProfile';
import styled from 'styled-components';
import Layout from '../common/Layout';

function ProfileLanding() {
  return (
    <Layout padding>
      <StyledRoot>
        <CreateProfile
          comment={
            <div>
              <h1>환영합니다 :^)</h1>
              <h1>
                <b>팩맨</b>에서 사용하실 <b>프로필</b>을
              </h1>
              <h1>완성해주세요.</h1>
            </div>
          }
        />
      </StyledRoot>
    </Layout>
  );
}

export default ProfileLanding;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

import CreateProfile from './components/profile/CreateProfile';
import Header from '../components/common/Header';
import styled from 'styled-components';

function Profile() {
  return (
    <StyledRoot>
      <Header />
      <StyledCommentWrapper>
        <h1>환영합니다 :^)</h1>
        <h1>
          <b>팩맨</b>에서 사용하실 <b>프로필</b>을
        </h1>
        <h1>완성해주세요.</h1>
      </StyledCommentWrapper>
      <CreateProfile />
    </StyledRoot>
  );
}

export default Profile;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
`;
const StyledCommentWrapper = styled.h1`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > h1 {
    line-height: 2.9rem;
    font-weight: 300;
    font-size: 2.4rem;
    color: #000;
    word-break: break-all;
    word-wrap: break-word;
  }
  & b {
    font-weight: 500;
  }
`;

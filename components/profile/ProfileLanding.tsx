import CreateProfile from './CreateProfile';
import styled from 'styled-components';
import Layout from '../common/Layout';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../../utils/recoil/atom/atom';
import { useInvitation } from '../../utils/hooks/auth';

function ProfileLanding() {
  const { isAlreadyUser } = useRecoilValue(authUserAtom);

  useEffect(() => {
    isAlreadyUser && receiveGuest();
  }, [isAlreadyUser]);

  const receiveGuest = useInvitation();
  return (
    <Layout padding noHeader>
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

  height: 100%;
  overflow-y: auto;
  margin-top: 4.7rem;

  /* 브라우저별 스크롤바 숨김 설정 */
  -ms-overflow-style: none; // Edge
  scrollbar-width: none; // Firefox
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`;

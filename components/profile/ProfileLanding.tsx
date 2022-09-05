import { useEffect } from 'react';
import CreateProfile from './CreateProfile';
import styled from 'styled-components';
import Layout from '../common/Layout';
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../../utils/recoil/atom/atom';
import { useRouter } from 'next/router';

function ProfileLanding() {
  const router = useRouter();
  const { isAlreadyUser } = useRecoilValue(authUserAtom);

  useEffect(() => {
    if (isAlreadyUser) {
      router.replace('/folder');
    }
  }, []);

  return (
    !isAlreadyUser && (
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
    )
  );
}

export default ProfileLanding;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

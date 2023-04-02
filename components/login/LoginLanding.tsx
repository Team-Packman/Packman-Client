import React, { useEffect } from 'react';
import styled from 'styled-components';
import loginLogo from '/public/assets/png/loginLogo.webp';
import KakaoLogin from '/public/assets/png/kakaoLogin.webp';
import Image from 'next/image';
import Link from 'next/link';
import { packmanColors } from '../../styles/color';
import { useRouter } from 'next/router';
import { useInvitation, useKaKaoLogin } from '../../utils/hooks/auth';
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../../utils/recoil/atom/atom';
import { KAKAO_HREF, PRIVACY_POLICY, TEMRS_OF_SERVICE } from '../../utils/constant';

function LoginLanding() {
  const router = useRouter();
  const { isAlreadyUser } = useRecoilValue(authUserAtom);

  const login = useKaKaoLogin();
  const receiveGuest = useInvitation();

  useEffect(() => {
    if (router.isReady && router.query.code) {
      login(router.query.code);
    }
  }, [router.isReady]);

  useEffect(() => {
    isAlreadyUser && receiveGuest();
  }, [isAlreadyUser]);

  return (
    <StyledRoot>
      <h1>팩맨 - 내 손안 짐 챙김 도우미</h1>
      <LogoAndTitle>
        <LogoWrapper>
          <Image src={loginLogo} alt="팩맨 로고" layout="fill" />
        </LogoWrapper>
        <Title>내 손안 짐 챙김 도우미</Title>
      </LogoAndTitle>

      <LoginContainer>
        <Link href={KAKAO_HREF}>
          <LoginButton id="custom-login-btn">
            <Image src={KakaoLogin} alt="카카오 로그인 버튼" layout="fill" />
          </LoginButton>
        </Link>
        <p>
          로그인 시 <Link href={TEMRS_OF_SERVICE}>이용약관</Link>과{' '}
          <Link href={PRIVACY_POLICY}>개인정보 처리 방침</Link>에 동의하게 됩니다.
        </p>
      </LoginContainer>
    </StyledRoot>
  );
}

export default LoginLanding;

const StyledRoot = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: ${packmanColors.pmBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  & > h1 {
    font-size: 10rem;
    opacity: 0;
  }
`;

const LogoAndTitle = styled.div`
  width: 100%;
  position: absolute;
  top: 20vh;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 80%;
  aspect-ratio: 13.16 / 6.01;

  @media screen and (min-width: 700px) {
    max-width: 60%;
  }

  @media screen and (min-width: 1024px) {
    max-width: 30%;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 1.9px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: row-reverse;
  padding-right: 4.3rem;
  color: ${packmanColors.pmWhite};

  @media screen and (min-width: 700px) {
    font-size: 2.3rem;
  }
`;

const LoginContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8em;

  & > p {
    font-size: 1.2rem;
    font-weight: 400;
    color: ${packmanColors.pmDeepGrey};

    position: absolute;
    top: calc(100% + 1.2rem);
    left: 50%;
    width: 200%;
    transform: translateX(-50%);
    text-align: center;
  }

  @media screen and (min-width: 700px) {
    font-size: 1.5rem;
  }
`;

const LoginButton = styled.div`
  width: 33.6rem;
  max-width: calc(100% - 4rem);

  position: relative;

  aspect-ratio: 33.6/ 4.5;

  &::before {
    content: '3초만에 시작하기';
    font-size: 1.6rem;
    font-weight: 600;
    color: ${packmanColors.pmWhite};

    position: absolute;
    bottom: calc(100% + 1.2rem);
    left: 50%;
    transform: translateX(-50%);
  }
`;

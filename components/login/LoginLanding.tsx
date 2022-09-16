import React, { useEffect } from 'react';
import styled from 'styled-components';
import loginLogo from '/public/assets/svg/loginLogo.svg';
import KakaoLogin from '/public/assets/svg/kakaoLogin.svg';
import Image from 'next/image';
import Link from 'next/link';
import { packmanColors } from '../../styles/color';
import { useRouter } from 'next/router';
import { useInvitation, useKaKaoLogin } from '../../utils/hooks/auth';
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../../utils/recoil/atom/atom';
import { KAKAO_HREF } from '../../utils/constant';

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
      <h1>팩맨 - 내 손안의 짐 챙김 도우미</h1>
      <LogoAndTitle>
        <Image src={loginLogo} alt="팩맨 로고" />
        <Title>내 손안의 짐 챙김 도우미</Title>
      </LogoAndTitle>
      <ButtonsContainer>
        <LoginDescription>3초만에 시작하기</LoginDescription>
        <Link href={KAKAO_HREF}>
          <LoginButton id="custom-login-btn">
            <Image src={KakaoLogin} alt="카카오 로그인 버튼" layout="fill" />
          </LoginButton>
        </Link>
        <LoginDescription>
          로그인 시 이용약관과 개인정보 처리 방침에 동의하게 됩니다.
        </LoginDescription>
      </ButtonsContainer>
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
  position: absolute;
  top: 20vh;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
`;

const ButtonsContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const LoginButton = styled.div`
  max-width: calc(100% - 4rem);
  width: 336px;
  height: 45px;
  position: relative;
`;

const LoginDescription = styled.div`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  display: flex;
  align-items: center;
  color: ${packmanColors.pmWhite};
`;

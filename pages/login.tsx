import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGlobalState from '../utils/hooks/useGlobalState';
import { packmanColors } from '../styles/color';
import loginLogo from '/public/assets/svg/loginLogo.svg';
import KakaoLogin from '/public/assets/png/kakaoLogin.png';
import useAPI from '../utils/hooks/useAPI';
import { useMutation } from 'react-query';

declare global {
  interface Window {
    google?: any;
    Kakao?: any;
  }
}

function Login() {
  const [google, setGoogle] = useState();
  const [token, setToken] = useGlobalState<string>('token');
  const fetchGoogleLogin = useAPI((api) => api.auth.fetchGoogleLogin);
  const { mutate: googleLogin } = useMutation('fetchGoogleLogin', fetchGoogleLogin);
  const fetchKakaoLogin = useAPI((api) => api.auth.fetchKakaoLogin);
  const { mutate: kakaoLogin } = useMutation('fetchKakaoLogin', fetchKakaoLogin);

  useEffect(() => {
    if (window.google) {
      setGoogle(window.google);
    }
  }, []);

  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (google) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: (res: { credential: string }) => {
          console.log(res.credential);
          googleLogin(
            { accessToken: res.credential },
            {
              onSuccess: (data) => {
                console.log('success', data);
              },
            },
          );
          setToken(res.credential);
        },
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      google.accounts.id.renderButton(document.getElementById('GoogleDiv'), {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
        width: '336',
      });
    }
  }, [google]);

  function loginWithKakao() {
    window.Kakao.Auth.login({
      success: function (authObj: unknown) {
        kakaoLogin(
          {
            accessToken: (authObj as { access_token: string }).access_token,
          },
          {
            onSuccess: (data) => {
              console.log('kakao success', data);
            },
          },
        );
        setToken(JSON.stringify(authObj));
      },
      fail: function (err: Error) {
        alert(JSON.stringify(err));
      },
    });
  }

  return (
    <StyledRoot>
      <LogoAndTitle>
        <Image src={loginLogo} alt="팩맨 로고" />
        <Title>내 손안의 짐 챙김 도우미</Title>
      </LogoAndTitle>
      <ButtonsContainer>
        <LoginDescription>3초만에 시작하기</LoginDescription>
        <LoginButton>
          <div id="GoogleDiv"></div>
        </LoginButton>
        <LoginButton id="custom-login-btn" onClick={loginWithKakao}>
          <Image src={KakaoLogin} alt="카카오 로그인 버튼" layout="fill" />
        </LoginButton>
        <LoginDescription>
          로그인 시 이용약관과 개인정보 처리 방침에 동의하게 됩니다.
        </LoginDescription>
      </ButtonsContainer>
    </StyledRoot>
  );
}

export default Login;

const StyledRoot = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: ${packmanColors.pmBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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
  top: 65%;
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

  & > div {
    /* position: absolute !important; */
  }
`;

const LoginDescription = styled.div`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  display: flex;
  align-items: center;
  color: ${packmanColors.pmWhite};
`;

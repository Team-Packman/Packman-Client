import Image from 'next/image';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import useGlobalState from '../utils/hooks/useGlobalState';
import { packmanColors } from '../styles/color';
import loginLogo from '/public/assets/svg/loginLogo.svg';
import KakaoLogin from '/public/assets/png/kakaoLogin.png';
import useAPI, { useSetToken } from '../utils/hooks/useAPI';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import axios from 'axios';
import { From, User } from '../type/globalState';
import useCache from '../utils/hooks/useCache';
import useGlobalSelector from '../utils/hooks/useGlobalSelector';

declare global {
  interface Window {
    Kakao?: any;
  }
}

function Login() {
  const router = useRouter();
  const [user, setUser] = useGlobalState<User>('User');
  const [cache] = useCache<User>('User');
  const [__, setFrom] = useGlobalSelector<From>('From');
  const [from] = useCache<From>('From');

  const fetchKakaoLogin = useAPI((api) => api.auth.fetchKakaoLogin);
  const { mutate: kakaoLogin } = useMutation('fetchKakaoLogin', fetchKakaoLogin);
  const setToken = useSetToken();

  useEffect(() => {
    if (router.isReady) {
      if (router.query.code) {
        const url = encodeURI('http://localhost:3000/login');
        (async () => {
          const { data }: { data: { access_token: string } } = await axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&code=${router.query.code}&redirect_uri=${url}`,
            {},
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          );
          kakaoLogin(
            {
              accessToken: data.access_token,
            },
            {
              onSuccess: ({ data }) => {
                localStorage.setItem('User', JSON.stringify(data));
                setToken(data.accessToken);
                if (data.isAlreadyUser) {
                  if (from?.url) {
                    router.replace(from.url);
                  } else {
                    router.push('/folder');
                  }
                  setFrom({ url: '' });
                } else if (user && !user.isAlreadyUser) {
                  router.push('/profile');
                }
              },
            },
          );
        })();
      }
    }
  }, [router.isReady]);
  //

  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      }
    }
  }, []);

  async function loginWithKakao() {
    if (window.Kakao.isInitialized()) {
      window.Kakao.Auth.authorize({
        redirectUri: 'https://packman.kr/login',
      });
    }
  }

  return (
    <StyledRoot>
      <LogoAndTitle>
        <Image src={loginLogo} alt="팩맨 로고" />
        <Title>내 손안의 짐 챙김 도우미</Title>
      </LogoAndTitle>
      <ButtonsContainer>
        <LoginDescription>3초만에 시작하기</LoginDescription>
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

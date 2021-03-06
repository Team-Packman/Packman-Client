import Image from 'next/image';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../styles/color';
import loginLogo from '/public/assets/svg/loginLogo.svg';
import KakaoLogin from '/public/assets/png/kakaoLogin.png';
import useAPI from '../utils/hooks/useAPI';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authedUser, creatingUser, from } from '../utils/recoil/atom/atom';

declare global {
  interface Window {
    Kakao?: any;
  }
}

function Login() {
  const router = useRouter();

  const [fromInfo, setFromInfo] = useRecoilState(from);
  const setUser = useSetRecoilState(authedUser);
  const setCreatingUser = useSetRecoilState(creatingUser);
  const fetchKakaoLogin = useAPI((api) => api.auth.fetchKakaoLogin);
  const { mutate: kakaoLogin } = useMutation('fetchKakaoLogin', fetchKakaoLogin);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.code) {
        const url = encodeURI(process.env.NEXT_PUBLIC_REDIRECT ?? '');
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
                console.log('kakao login success');

                if (data.isAlreadyUser) {
                  setUser(data);
                  if (fromInfo.url) {
                    router.replace(fromInfo.url);
                  } else {
                    router.replace('/folder');
                  }
                  setFromInfo({ url: '' });
                } else {
                  setCreatingUser(data);
                  router.replace('/profile');
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
        redirectUri: process.env.NEXT_PUBLIC_REDIRECT,
      });
    }
  }

  return (
    <StyledRoot>
      <LogoAndTitle>
        <Image src={loginLogo} alt="?????? ??????" />
        <Title>??? ????????? ??? ?????? ?????????</Title>
      </LogoAndTitle>
      <ButtonsContainer>
        <LoginDescription>3????????? ????????????</LoginDescription>
        <LoginButton id="custom-login-btn" onClick={loginWithKakao}>
          <Image src={KakaoLogin} alt="????????? ????????? ??????" layout="fill" />
        </LoginButton>
        <LoginDescription>
          ????????? ??? ??????????????? ???????????? ?????? ????????? ???????????? ?????????.
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
`;

const LoginDescription = styled.div`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  display: flex;
  align-items: center;
  color: ${packmanColors.pmWhite};
`;

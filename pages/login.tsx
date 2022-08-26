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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authUserAtom, creatingUserAtom, from, kakao } from '../utils/recoil/atom/atom';
import Link from 'next/link';

declare global {
  interface Window {
    Kakao?: any;
  }
}

function Login() {
  const router = useRouter();

  const [fromInfo, setFromInfo] = useRecoilState(from);
  const setUser = useSetRecoilState(authUserAtom);
  const setCreatingUser = useSetRecoilState(creatingUserAtom);
  const fetchKakaoLogin = useAPI((api) => api.auth.fetchKakaoLogin);
  const { mutate: kakaoLogin } = useMutation('fetchKakaoLogin', fetchKakaoLogin);
  const setKakaoInfo = useSetRecoilState(kakao);

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

          /** 카카오 액세스 토큰, 유저 닉네임 저장 */
          setKakaoInfo({
            accessToken: data.access_token,
          });
          kakaoLogin(
            {
              accessToken: data.access_token,
            },
            {
              onSuccess: ({ data }) => {
                if (data.isAlreadyUser) {
                  setUser((prev) => ({ ...prev, ...data }));
                  if (fromInfo.url) {
                    // 그룹원 등록 api 추가 예정 > 성공시 아래 경로로 라우팅
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
      } else if (router.query.error) {
        if (router.query.error_description) {
          alert(router.query.error_description);
        } else {
          alert('문제 발생');
        }
      }
    }
  }, [router.isReady]);

  return (
    <StyledRoot>
      <LogoAndTitle>
        <Image src={loginLogo} alt="팩맨 로고" />
        <Title>내 손안의 짐 챙김 도우미</Title>
      </LogoAndTitle>
      <ButtonsContainer>
        <LoginDescription>3초만에 시작하기</LoginDescription>
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${
            process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
          }&redirect_uri=${encodeURI(process.env.NEXT_PUBLIC_REDIRECT ?? '')}&response_type=code`}
        >
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

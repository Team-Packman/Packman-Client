import React from 'react';
import HeadMeta from '../components/HeadMeta';
import LoginLanding from '../components/login/LoginLanding';
import { AsyncBoundary } from '../utils/AsyncBoundary';

function Login() {
  return (
    <>
      <HeadMeta
        title="Packman : 로그인"
        description="카카오 로그인으로 3초만에 시작하기"
        url="https://www.packman.kr/login"
      />
      <AsyncBoundary>
        <LoginLanding />
      </AsyncBoundary>
    </>
  );
}

export default Login;

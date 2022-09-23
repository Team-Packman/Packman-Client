import React from 'react';
import HeadMeta from '../components/HeadMeta';
import LoginLanding from '../components/login/LoginLanding';
import { AsyncBoundary } from '../utils/AsyncBoundary';

interface LoginProps {
  title?: string;
  description?: string;
  url?: string;
}
function Login(props: LoginProps) {
  const { title, description, url } = props;
  return (
    <AsyncBoundary>
      <HeadMeta title={title} description={description} url={url} />
      <LoginLanding />
    </AsyncBoundary>
  );
}

export default Login;

Login.getInitialProps = () => {
  return {
    title: 'Packman : 로그인',
    description: '카카오 로그인으로 3초만에 시작하기',
    url: 'https://www.packman.kr/login',
  };
};

import React from 'react';
import HeadMeta from '../components/HeadMeta';
import LoginLanding from '../components/login/LoginLanding';
import { AsyncBoundary } from '../utils/AsyncBoundary';

function Login() {
  return (
    <AsyncBoundary>
      <LoginLanding />
    </AsyncBoundary>
  );
}

Login.displayName = 'login';
export default Login;

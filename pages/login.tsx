import React from 'react';
import LoginLanding from '../components/login/LoginLanding';
import { AsyncBoundary } from '../utils/AsyncBoundary';

function Login() {
  return (
    <AsyncBoundary>
      <LoginLanding />
    </AsyncBoundary>
  );
}

Login.displayName = 'Login';
export default Login;

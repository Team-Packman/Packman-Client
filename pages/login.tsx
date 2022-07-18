import React, { useEffect, useState } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import styled from 'styled-components';
import useGlobalState from '../utils/hooks/useGlobalState';

declare global {
  interface Window {
    google: any;
  }
}

function Login() {
  const ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const [google, setGoogle] = useState();
  const [token, setToken] = useGlobalState<string>('token');

  useEffect(() => {
    if (window.google) {
      setGoogle(window.google);
    }
  }, []);

  useEffect(() => {
    if (google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: (res: { credential: string }) => setToken(res.credential),
      });
      google.accounts.id.renderButton(document.getElementById('GoogleDiv'), {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
      });
    }
  }, [google]);

  return <StyledRoot></StyledRoot>;
}

export default Login;

const StyledRoot = styled.div``;

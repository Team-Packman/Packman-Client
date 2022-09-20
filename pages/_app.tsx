import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';
import { APIProvider } from '../utils/context/apiContext';
import { GlobalStyle } from '../styles/globalStyle';
import { CssBaseline } from '@mui/material';
import { setScreenSize } from '../utils/setScreenSize';
import { RecoilRoot } from 'recoil';
import InstallGuide from '../components/common/InstallGuide';
import HeadMeta from '../components/HeadMeta';
import { AsyncBoundary } from '../utils/AsyncBoundary';
import React from 'react';
import Head from 'next/head';

interface HeadMetaProps {
  title?: string;
  description?: string;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [show, setShow] = useState(false);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
            retry: 0,
          },
        },
      }),
  );

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', () => setScreenSize());
    return () => window.removeEventListener('resize', setScreenSize);
  });

  useEffect(() => {
    setShow(true);
  }, []);

  if (!show) return null;
  return (
    <>
      {/* <HeadMeta props={pageProps as HeadMetaProps} /> */}
      <Head>
        <title>{pageProps.title || '팩맨 - 내 손안의 짐 챙김 도우미'}</title>
        <meta
          name="description"
          content={
            pageProps.description || '내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!'
          }
        />
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
        />
        <meta property="og:title" content={pageProps.title || '팩맨 - 내 손안의 짐 챙김 도우미'} />
        <meta
          property="og:description"
          content={
            pageProps.description || '내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!'
          }
        />
        <meta property="og:image" content="/assets/pwa/apple-splash-1136-640.jpg" />
        <meta property="og:url" content="https://www.packman.kr" />
      </Head>
      <CssBaseline />
      <GlobalStyle />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <APIProvider baseURL={process.env.NEXT_PUBLIC_END ?? ''}>
            <Hydrate state={pageProps?.dehydratedState}>
              <AsyncBoundary>
                <GlobalStyle />
                <Component {...pageProps} />
                <InstallGuide />
              </AsyncBoundary>
            </Hydrate>
          </APIProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

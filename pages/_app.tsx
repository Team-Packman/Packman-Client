import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';
import { APIProvider } from '../utils/context/apiContext';
import { GlobalStyle } from '../styles/globalStyle';
import { CssBaseline } from '@mui/material';
import { setScreenSize } from '../utils/setScreenSize';
import { RecoilRoot } from 'recoil';
import InstallGuide from '../components/common/InstallGuide';
import { AsyncBoundary } from '../utils/AsyncBoundary';
import React from 'react';
import GoogleTagManager from '../components/GoogleTagManager';
import { AxiosInterceptor } from '../utils/axios';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
            retry: 0,
            notifyOnChangeProps: 'tracked',
          },
        },
      }),
  );

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', () => setScreenSize());
    return () => window.removeEventListener('resize', setScreenSize);
  });

  return (
    <>
      <DefaultSeo
        title="팩맨 Packman - 내 손안 짐챙김 도우미"
        description="내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!"
        canonical="https:/www.packman.kr"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.packman.kr',
          siteName: 'Packman',
        }}
        twitter={{
          handle: '@packman',
          site: '@Packman',
          cardType: 'summary_large_image',
        }}
      />
      <GoogleTagManager />
      <CssBaseline />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <AxiosInterceptor>
            <APIProvider baseURL={process.env.NEXT_PUBLIC_END ?? ''}>
              <Hydrate state={pageProps?.dehydratedState}>
                <AsyncBoundary>
                  <GlobalStyle />
                  <Component {...pageProps} />
                  <InstallGuide />
                </AsyncBoundary>
              </Hydrate>
            </APIProvider>
          </AxiosInterceptor>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

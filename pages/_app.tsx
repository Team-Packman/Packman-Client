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
      <HeadMeta page={Component.displayName} />
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

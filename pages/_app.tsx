import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';
import { APIProvider, AuthProvider } from '../utils/context/apiContext';
import { GlobalStyle } from '../styles/globalStyle';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { CssBaseline } from '@mui/material';
import { setScreenSize } from '../utils/setScreenSize';
import { RecoilRoot } from 'recoil';
import useInstallGuide from '../utils/hooks/useInstallGuide';
import InstallGuide from '../components/common/InstallGuide';

function MyApp({ Component, pageProps }: AppProps) {
  const [show, setShow] = useState(false);
  const [installGuide, installHandler, closeGuide] = useInstallGuide();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
          },
        },
      }),
  );

  useEffect(() => {
    const localStoragePersistor = createWebStoragePersistor({ storage: window?.localStorage });

    persistQueryClient({
      queryClient,
      persistor: localStoragePersistor,
      dehydrateOptions: {
        shouldDehydrateQuery: ({ queryKey }) => {
          return queryKey === 'User' || queryKey === 'From' ? true : false;
        },
      },
    });
  }, [queryClient]);

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
      <Head>
        <title>Packman</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Head>
      <CssBaseline />
      <GlobalStyle />
      <RecoilRoot>
        <APIProvider>
          <AuthProvider baseURL={process.env.NEXT_PUBLIC_END ?? ''}>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps?.dehydratedState}>
                <GlobalStyle />
                <Component {...pageProps} />
                <InstallGuide
                  open={installGuide.open}
                  agent={installGuide.agent}
                  installHandler={installHandler}
                  closeHandler={closeGuide}
                />
              </Hydrate>
            </QueryClientProvider>
          </AuthProvider>
        </APIProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

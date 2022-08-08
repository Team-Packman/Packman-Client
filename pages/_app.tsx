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
import useCache from '../utils/hooks/useCache';
import { RecoilRoot } from 'recoil';
import UpdateNotification from '../components/common/UpdateNotification';

function MyApp({ Component, pageProps }: AppProps) {
  const [show, setShow] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [user] = useCache('User');

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

    async function detectSWUpdate() {
      const registration = await navigator.serviceWorker.ready;

      registration.addEventListener('updatefound', (event) => {
        const newSW = registration.installing;

        if (newSW) {
          newSW.addEventListener('statechange', (event) => {
            if (newSW.state == 'installed') {
              setUpdated(true);
            }
          });
        }
      });
    }

    detectSWUpdate();
  }, []);

  if (!show) return null;

  return (
    <>
      <CssBaseline />
      <Head>
        <title>Packman</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Head>
      <GlobalStyle />
      <RecoilRoot>
        <APIProvider>
          <AuthProvider baseURL={process.env.NEXT_PUBLIC_END ?? ''}>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps?.dehydratedState}>
                <GlobalStyle />
                <Component {...pageProps} />
                {updated && <UpdateNotification />}
              </Hydrate>
            </QueryClientProvider>
          </AuthProvider>
        </APIProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

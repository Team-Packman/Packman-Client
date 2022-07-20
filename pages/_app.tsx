import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';
import { APIProvider } from '../utils/context/apiContext';
import { GlobalStyle } from '../styles/globalStyle';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { CssBaseline } from '@mui/material';
import { setScreenSize } from '../utils/setScreenSize';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
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
          return queryKey === 'user' ? true : false;
        },
      },
    });
  }, [queryClient]);

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', () => setScreenSize());
    return () => window.removeEventListener('resize', setScreenSize);
  });
  // if (!showing) {
  //   return null;
  // }

  return (
    <>
      <CssBaseline />
      <Head>
        <title>Packman</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Head>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <APIProvider baseURL={'http://15.164.165.92:8000'}>
            <GlobalStyle />
            <Component {...pageProps} />
          </APIProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

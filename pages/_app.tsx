import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';
import { APIProvider } from '../utils/context/apiContext';
import { GlobalStyle } from '../styles/globalStyle';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import Layout from './components/Layout';
import { CssBaseline } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

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
  }, []);

  return (
    <>
      <CssBaseline />
      <Head>
        <title>Packman</title>
      </Head>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <APIProvider baseURL={'/'}>
            <GlobalStyle />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </APIProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

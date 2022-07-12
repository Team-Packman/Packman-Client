import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { APIProvider } from '../utils/context/apiContext';
import { connectMSW } from '../mocks';
import { GlobalStyle } from '../styles/globalStyle';
import Layout from './components/layout';

connectMSW();

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Packman</title>
      </Head>
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

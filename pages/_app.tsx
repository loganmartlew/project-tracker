import { useState, FC } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Hydrate, QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@styles/globals';
import theme from '@styles/theme';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Project Tracker</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <NextAuthProvider session={pageProps.session}>
              <GlobalStyles />
              <Component {...pageProps} />
            </NextAuthProvider>
          </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools position='bottom-right' />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;

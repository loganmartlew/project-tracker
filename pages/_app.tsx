import { FC } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@styles/globals';
import theme from '@styles/theme';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Project Tracker</title>
      </Head>
      <ThemeProvider theme={theme}>
        <NextAuthProvider session={pageProps.session}>
          <GlobalStyles />
          <Component {...pageProps} />
        </NextAuthProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;

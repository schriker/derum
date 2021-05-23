import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo, useApollo } from '../lib/apolloClient';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/theme';
import useFacebookSDK from '../hooks/useFacebookSDK';
import '../css/ScrollBar.css';

function MyApp({ Component, pageProps }: AppProps) {
  useFacebookSDK();
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;

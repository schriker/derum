import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/theme';
import '../css/scrollBar.css';
import NextNprogress from 'nextjs-progressbar';
import Script from 'next/script';
import { FacebookSDK } from '../types/facebook';

declare global {
  interface Window {
    FB: FacebookSDK;
  }
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
        <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="lazyOnload"
          onLoad={() =>
            window.FB.init({
              appId: process.env.NEXT_PUBLIC_FB_APP_ID,
              cookie: true,
              xfbml: true,
              version: 'v11.0',
            })
          }
        />
        <CssBaseline />
        <NextNprogress
          color="#214dff"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;

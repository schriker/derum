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
import { GoogleAuth, GoogleSDK } from '../types/google';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import relativeTime from 'dayjs/plugin/relativeTime';
import GlobalError from '../components/GlobalError/GlobalError';

dayjs.locale('pl');
dayjs.extend(relativeTime);

declare global {
  interface Window {
    FB: FacebookSDK;
    gapi: GoogleSDK;
    googleAuth: GoogleAuth;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
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
        <Script
          src="https://apis.google.com/js/api:client.js"
          strategy="lazyOnload"
          onLoad={() => {
            window.gapi.load('auth2', () => {
              window.googleAuth = window.gapi.auth2.init({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_APP_ID,
                cookiepolicy: 'single_host_origin',
              });
            });
          }}
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
        <GlobalError />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;

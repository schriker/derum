import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/theme';
import useFacebookSDK from '../hooks/useFacebookSDK';
import '../css/scrollBar.css';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps, ...rest }: AppProps) {
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

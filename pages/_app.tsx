import Head from 'next/head';
import { AppProps } from 'next/app';
import { NextPageContext } from 'next';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import { NextPageWithLayout } from '@/types/global';
import { Session } from 'next-auth';
import { SessionProvider, getSession } from 'next-auth/react';

import MuiThemeProvider from '@/com/themes/MuiThemeProvider';
import '@/styles/global.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
  session: Session;
}
export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache, session } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <MuiThemeProvider Component={Component}>
          <Component {...pageProps} />
        </MuiThemeProvider>
      </SessionProvider>
    </CacheProvider>
  );
}

// get session on page refresh
MyApp.getInitialProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  return { session: session };
};

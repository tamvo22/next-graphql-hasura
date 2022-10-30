import Head from 'next/head';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import { Hydrate, DehydratedState, QueryClientProvider } from '@tanstack/react-query';
import { useAtomValue } from 'jotai/utils';
import { queryClientAtom } from 'jotai/query';
import MuiThemeProvider from '@/com/themes/MuiThemeProvider';
import '@/styles/global.css';

const clientSideEmotionCache = createEmotionCache();

type Props = AppProps<{
  dehydratedState?: DehydratedState;
}> & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

export default function MyApp(props: Props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const queryClient = useAtomValue(queryClientAtom);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <MuiThemeProvider Component={Component}>
            <Component {...pageProps} />
          </MuiThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </CacheProvider>
  );
}

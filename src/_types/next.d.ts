import type { NextComponentType, NextPageContext, NextRouter } from 'next';
import type { Session } from 'next-auth';
import type { Router } from 'next/router';
import { DehydratedState } from '@tanstack/react-query';

declare module 'next/app' {
  type AppProps<P = {}, R extends NextRouter = NextRouter> = {
    Component: NextComponentType<NextPageContext, any, P>;
    router: R;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    __N_RSC?: boolean;
    pageProps: P;
  };
}

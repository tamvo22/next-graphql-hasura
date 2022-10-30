import React from 'react';
import type { NextPage } from 'next';
import { Session } from 'next-auth';
import { DehydratedState } from '@tanstack/react-query';

// Global types declaration
declare global {
  type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  interface HasuraAuth {
    accessToken: string;
    role: string;
  }
}

import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { useAtom } from 'jotai';
import { SessionAtom } from '@/utils/store/globalAtoms';
import { RenewToken } from '@/utils/auth/renewToken';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const axiosClient = axios.create();

// Silent refreshToken accessing Hasura resource
type OriginalConfig = AxiosRequestConfig & {
  _retry: boolean;
};

/* axiosClient.interceptors.request.use(
  function (config) {
    console.log('axiosClient-request', config);
    // Do something before request is sent
    return config;
  },
  function (error) {
    console.log('axiosClient-error', error);
    // Do something with request error
    return Promise.reject(error);
  },
); */

axiosClient.interceptors.response.use(
  // Retry once if accessToken failed once due to 'invalid-jwt'
  async (res) => {
    const originalConfig = res.config as OriginalConfig;

    if (res?.data?.errors?.[0].extensions.code === 'invalid-jwt' && !originalConfig?._retry) {
      originalConfig._retry = true;

      try {
        const data = await RenewToken(true);

        if (data) {
          const { accessToken, user } = data;

          return axiosClient({
            ...originalConfig,
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
              'x-hasura-role': user.role,
            },
          });
        }
      } catch (_error: any) {
        console.log('_error', _error);
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }
        return Promise.reject(_error);
      }
    }

    return res.data;
  },
  async (error) => {
    console.log('error', error);
    return Promise.reject(error);
  },
);

/**
 * Hasura codegen custom fetcher using axios with intercept rovolving session.accessToken
 * Custom fetcher enabling isReactHook: true and using Jotai stored token variables
 *
 * [Codegen plugin typescript-react-query](https://www.graphql-code-generator.com/plugins/typescript-react-query)
 *
 * [Axios Interceptor refresh token](https://www.bezkoder.com/axios-interceptors-refresh-token/)
 */
export const AxiosFetcher = <TData, TVariables>(query: string, options?: RequestInit['headers']): ((variables?: TVariables) => Promise<TData>) => {
  const [session, sessionSet] = useAtom(SessionAtom);

  return async (variables?: TVariables) => {
    const data = await RenewToken({ session: session!, setSession: sessionSet! });

    if (data) {
      const { accessToken, user } = data;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'x-hasura-role': user.role,
      } as AxiosRequestHeaders;

      const res = await axiosClient(publicRuntimeConfig.HASURA_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
          ...((options as AxiosRequestHeaders) ?? {}),
        },
        data: {
          query,
          variables,
        },
      });

      return res.data;
    }
  };
};

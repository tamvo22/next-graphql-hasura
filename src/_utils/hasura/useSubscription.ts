import { useEffect } from 'react';
import { atom } from 'jotai';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { QueryKey, useQueryClient } from 'react-query';
import { removeHttp } from '@/utils/helper/regExp';
import { RenewToken } from '@/utils/auth/renewToken';
import { SessionAtom } from '@/utils/store/globalAtoms';
import { nanoid } from 'nanoid';
// https://github.com/motleydev/react-query-with-graphql-demo

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const url = 'wss://' + removeHttp(publicRuntimeConfig.HASURA_API_ENDPOINT);
const subscribeId = nanoid(32);

const IsSubscribingAtom = atom(false);
const isSubscribingSuccessAtom = atom(false);

/**
 * React-Query useSubscription Websocket using random Id reconnecting with session's accessToken every 15 seconds
 *
 * @reference
 * https://github.com/motleydev/react-query-with-graphql-demo
 * @example
 * const Customers = useQuery(['customers'], () => [], {
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });

  const { isSubscribing, isSubscribingSuccess } = useSubscription(
    ['customers'],
    `subscription GetCustomers {
        customers {
          id
          email
          first_name
          last_name
        }
      }`,
  );

  console.log('isSubscribing', isSubscribing);
  console.log('isSubscribingSuccess', isSubscribingSuccess);
  console.log('Customers', Customers);
 */
export const useSubscription = <TVariables>(queryKey: QueryKey, query: string, variables?: TVariables) => {
  const session = useAtomValue(SessionAtom);
  const sessionSet = useUpdateAtom(SessionAtom);

  const isSubscribing = useAtomValue(IsSubscribingAtom);
  const setIsSubscribing = useUpdateAtom(IsSubscribingAtom);
  const isSubscribingSuccess = useAtomValue(isSubscribingSuccessAtom);
  const setIsSubscribingSuccess = useUpdateAtom(isSubscribingSuccessAtom);

  const queryClient = useQueryClient();

  useEffect(() => {
    const subscribe = async () => {
      const data = await RenewToken({ session: session!, setSession: sessionSet! });

      if (data) {
        const ws = new WebSocket(url, 'graphql-ws');

        setIsSubscribing(true);

        const { accessToken, user } = data;

        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'x-hasura-role': user?.role,
        };

        const init_msg = {
          id: subscribeId,
          type: 'connection_init',
          payload: { headers: headers },
        };

        ws.onopen = function (event) {
          ws.send(JSON.stringify(init_msg));
          const msg = {
            id: subscribeId,
            type: 'start',
            payload: {
              operationName: null,
              query: query,
              variables: variables,
              extensions: {},
            },
          };
          ws.send(JSON.stringify(msg));
        };
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);

          if (data.type === 'data') {
            setIsSubscribingSuccess(true);
            const payload = data.payload.data[queryKey as string];
            queryClient.setQueriesData(queryKey, payload);
          }
        };

        ws.onclose = function (e) {
          // Socket accessToken expired reconnecting
          setTimeout(function () {
            subscribe();
          }, 1000);
        };

        return () => {
          ws.send(JSON.stringify({ id: subscribeId, type: 'stop' }));
          ws.close();
        };
      }
    };

    subscribe();
  }, [queryClient]);

  return { isSubscribing, isSubscribingSuccess };
};

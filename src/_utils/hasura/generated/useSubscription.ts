import { useEffect, useState } from 'react';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai/utils';
import { SessionAtomRef } from '@/utils/auth/useSession';
import { nanoid } from 'nanoid';

//Remove http:// and https:// from url
const removeHttp = (url: string) => {
  return url?.replace(/(^\w+:|^)\/\//, '');
};

const url = 'wss://' + removeHttp(process.env.HASURA_API_ENDPOINT!);
const subscribeId = nanoid(32);

/**
 * React-Query useSubscription using Websocket
 *
 * @reference
 * https://github.com/motleydev/react-query-with-graphql-demo
 * https://tkdodo.eu/blog/using-web-sockets-with-react-query
 * @example
 */
export const useQuerySubscription = <TVariables>(queryKey: QueryKey, query: string, variables?: TVariables) => {
  const [status, setStatus] = useState<'success' | 'loading' | 'error'>('loading');

  // get session atom state
  const session = useAtomValue(SessionAtomRef);
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscribe = async () => {
      if (session) {
        const ws = new WebSocket(url, 'graphql-ws');

        const headers = {
          Authorization: `Bearer ${session?.accessToken}`,
          'x-hasura-role': session?.user.role,
        };

        // pass in our accessToken and user role
        const init_msg = {
          id: subscribeId,
          type: 'connection_init',
          payload: { headers: headers },
        };

        // subscribe to the query data
        // Whenever the data gets changed, it will notify us of the new updates.
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

        ws.onopen = function (event) {
          ws.send(JSON.stringify(init_msg));
          ws.send(JSON.stringify(msg));
        };
        ws.onmessage = (event) => {
          const res = JSON.parse(event.data);

          if (res.type === 'data') {
            setStatus('success');

            // update our query data when new data is available
            const payload = res.payload;
            queryClient.setQueriesData(queryKey, payload.data);
          }
        };

        ws.onclose = function (e) {
          // reconnecting on socket expires
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

  return status;
};

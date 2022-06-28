import { useEffect } from 'react';
import { atom } from 'jotai';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useQueryClient } from 'react-query';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

//Subscription uses websockets for consistent real-time client-server connection
//https://github.com/motleydev/react-query-with-graphql-demo
//https://github.com/tannerlinsley/react-query/discussions/1506#discussioncomment-1210945

const url = 'ws://intent-shad-91.hasura.app/v1/graphql';

const IsSubscribingAtom = atom<boolean>(false);
const IsSubscribingSuccessAtom = atom<boolean>(false);

export const useColorSubscription = () => {
  const queryClient = useQueryClient();
  const isSubscribing = useAtomValue(IsSubscribingAtom);
  const setIsSubscribing = useUpdateAtom(IsSubscribingAtom);
  const isSubscribingSuccess = useAtomValue(IsSubscribingSuccessAtom);
  const setIsSubscribingSuccess = useUpdateAtom(IsSubscribingSuccessAtom);

  useEffect(() => {
    const ws = new WebSocket(url, 'graphql-ws');

    const client = new W3CWebSocket('wss://' + 'myserver.com' + '/api/ws', undefined, undefined, {
      Authorization: 'bearer ' + 'token',
    });

    setIsSubscribing(true);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'connection_init', payload: {} }));
      ws.send(
        JSON.stringify({
          id: '1',
          type: 'start',
          payload: {
            // variables: {},
            extensions: {},
            operationName: 'GetColors',
            query: `subscription GetColors {
                color {
                  color
                  complementary_colors {
                    color
                  }
                }
              }`,
          },
        }),
      );
    };

    ws.onmessage = (event) => {
      /* 
        const msg = JSON.parse(event.data);
        if (msg.type == 'data') {
        setIsSubscribingSuccess(true);
        setIsSubscribing(false);
        const data = msg.payload.data.color;
        queryClient.setQueriesData('colors', data);
      } */

      const data = JSON.parse(event.data);
      const queryKey = [...data.entity, data.id].filter(Boolean);
      queryClient.invalidateQueries(queryKey);
    };

    return () => {
      ws.send(JSON.stringify({ id: '1', type: 'stop' }));
      ws.close();
    };
  }, []);
  return { isSubscribing, isSubscribingSuccess };
};

import axios from 'axios';
import { useAtomValue } from 'jotai/utils';
import { SessionAtomRef } from '@/utils/auth/useSession';

const axiosClient = axios.create();

/**
 * Hasura codegen custom fetcher using axios to fetch data using user's session accessToken
 * Utilize Jotai atoms to pass get accessToken since Codegen React-Query custom fetcher doesn't expose "options" to pass headers
 *
 * [Codegen plugin typescript-react-query](https://www.graphql-code-generator.com/plugins/typescript-react-query)
 *
 */
export const useFetcher = <TData, TVariables>(query: string, options?: RequestInit['headers']): ((variables?: TVariables) => Promise<TData>) => {
  const session = useAtomValue(SessionAtomRef);

  return async (variables?: TVariables) => {
    const res = await axiosClient(process.env.HASURA_API_ENDPOINT!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
        'x-hasura-role': session?.user.role,
        ...(options as any),
      },
      data: {
        query,
        variables,
      },
    });

    return res.data;
  };
};

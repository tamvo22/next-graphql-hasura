import useAxios from '@/utils/hooks/useAxios';
import { AxiosRequestHeaders } from 'axios';
import { JWT } from 'next-auth/jwt';

type Mode = 'server' | 'client';

export interface HasuraQuery {
  query: string;
  variables?: any;
}

interface RequestServerProps {
  mode: 'server';
  data: HasuraQuery;
}

type RequestClientProps = {
  mode?: 'client';
  token: JWT;
  role: string;
  data: HasuraQuery;
};

/**
 * Direct Axios REST without ReactQuery
 * 
 * @example 
 * const data: HasuraQuery = {
    query: `
        mutation addCustomerOne($auth_uid: String!, $email: String!, $first_name: String!, $last_name: String!) {
          insert_customers_one(object: {auth_uid: $auth_uid, email: $email, first_name: $first_name, last_name: $last_name}) {
            id
            created_at
          }
        }
    `,
    variables: {
      auth_uid: customer.id,
      email: customer.email,
      first_name: firstName,
      last_name: lastName,
    },
  };

  const res = useHasuraApi({ mode: 'server', data }); 
 * 
 */
export async function useHasuraApi({ mode, token, role, data }: RequestClientProps): Promise<any>;
export async function useHasuraApi({ mode, data }: RequestServerProps): Promise<any>;
export async function useHasuraApi({ mode = 'client', token, role, data }: { mode?: Mode; token?: JWT; role?: string; data: HasuraQuery }) {
  let header: AxiosRequestHeaders;

  if (mode === 'server') {
    header = {
      'X-Hasura-Admin-Secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET!,
    };
  }

  if (mode === 'client') {
    header = {
      Authorization: `Bearer ${token!}`,
      'x-hasura-role': role!,
    };
  }

  const axiosServer = useAxios({
    headers: header!,
  });

  const result = await axiosServer.add(process.env.HASURA_API_ENDPOINT!, data);

  return result.data;
}

import { useQueryClient, useQuery, QueryKey, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
import { AxiosFetcher } from '@/utils/store/generated/axiosFetcher';

//https://hasura.io/blog/getting-started-with-react-query/

/**
 * ReactQuery REST API using server token as middleware
 *
 * @example
 * import useHasuraClient from '@/utils/store/useHasuraClient'
 * 
 * interface Customers {
    email: string;
    first_name: string;
    last_name: string;
    auth_uid: string;
  }

  interface QueryCustomers {
    customers: Omit<Customers, 'auth_uid'>;
  }

  interface MutateCustomers {
    object: Customers;
  }

  const hasuraClient = useHasuraClient();

  const fetchData = hasuraClient.query(['customers'], {
      query: `
            query MyQuery {
              customers {
                email
                first_name
                last_name
                auth_uid
              }
            }
          `,
    });

  console.log('fetchData', (fetchData?.data as QueryCustomers)?.customers);

  const deviant = hasuraClient.mutation<MutateCustomers>(['customers'], {
    query: `
        mutation MyMutation ($object: customers_insert_input!){
          insert_customers_one(object: $object) {
            email
            first_name
            last_name
          }
        }
      `,
  });

  const handleAddCustomerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    deviant.mutate({
      object: {
        email: 'JohnDoe@test.com',
        first_name: 'John',
        last_name: 'Doe',
        auth_uid: 'someAuth_id',
      },
    });
  };
  
  <button onClick={(e) => handleAddCustomerClick(e)}>Add New Customer</button>
 */
export default function useHasuraClient() {
  const queryClient = useQueryClient();

  const query = <TData, TVariables, TError = unknown>(queryKey: QueryKey, query: string, variables?: TVariables, options?: UseQueryOptions<TData, TError, TData>) =>
    useQuery<TData, TError, TData>(queryKey, AxiosFetcher<any, any>(query).bind(null, variables), options);

  const mutation = <TData, TVariables, TError = unknown, TContext = unknown>(
    queryKey: QueryKey,
    query: string,
    options?: UseMutationOptions<TData, TError, TVariables, TContext>,
  ) =>
    useMutation<TData, TError, TVariables, TContext>(queryKey, AxiosFetcher<TData, TVariables>(query), {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries(queryKey);
      },
      ...options,
    });

  return {
    query,
    mutation,
  };
}

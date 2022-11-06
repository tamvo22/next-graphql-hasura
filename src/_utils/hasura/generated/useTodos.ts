import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useQuerySubscription } from '@/utils/hasura/generated/useSubscription';
import {
  Todos,
  useGetTodosWhereQuery,
  GetTodoSubscribeDocument,
  GetTodosWhereDocument,
  useAddTodoMutation,
  useUpdateTodosWhereMutation,
  useDeleteTodosByIdMutation,
} from '@/utils/hasura/generated/graphql';

/**
 * useTodos function to perform both subscription and regular query updates
 * @param
 * - empty props: perform regular data updates
 * - subscribe: boolean; true: indicate whether to use subscription, false: regular data updates
 */
const useTodos = ({ subscribe = false }: { subscribe?: boolean } = {}) => {
  const queryClient = useQueryClient();

  // get document from codegen graphql file
  const queryDocument = subscribe ? GetTodoSubscribeDocument : GetTodosWhereDocument;

  const variables = {
    where: {},
  };

  // get Codegen queryKey
  const queryKey = useGetTodosWhereQuery.getKey(variables);

  // set queryClient staleTime to Infinity if using subscription else reset to default of 0
  subscribe ? queryClient.setQueryDefaults(queryKey, { staleTime: Infinity }) : queryClient.setQueryDefaults(queryKey, { staleTime: 0 });

  // get loading status of subscription
  const subStatus = subscribe && useQuerySubscription(queryKey, queryDocument, variables);

  // perform subscription or regular query updates
  const { data, status } = subscribe
    ? useQuery(queryKey, () => [] as Todos[], {
        enabled: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
      })
    : useGetTodosWhereQuery(variables, {
        enabled: true,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchIntervalInBackground: false,
      });

  // react-query options
  const queryOptions = {
    retry: 1,
    ...(!subscribe && {
      onSuccess: (data: any) => {
        // force refetch todos for regular queries
        queryClient.invalidateQueries(queryKey);
      },
    }),
  };

  // Add a new todo
  const mutateAddTodo = useAddTodoMutation(queryOptions);
  const addTodo = (todo: Partial<Todos>) => {
    const { id, ...rest } = todo;

    mutateAddTodo.mutate({
      object: {
        ...rest,
      },
    });
  };

  // Update a todo
  const mutateUpdateTodoWhere = useUpdateTodosWhereMutation(queryOptions);
  const updateTodo = (todo: Partial<Todos> & Required<Pick<Todos, 'id'>>) => {
    const { id, ...rest } = todo;

    mutateUpdateTodoWhere.mutate({
      where: { id: { _eq: id } },
      set: {
        ...rest,
      },
    });
  };

  // Delete a single Todo
  const mutateDeleteTodosById = useDeleteTodosByIdMutation(queryOptions);
  const deleteTodo = (todo: Partial<Omit<Todos, 'name' | 'completed'>>) => {
    mutateDeleteTodosById.mutate({
      id: todo?.id!,
    });
  };

  // multiple data properties since both React-Query and Hasura GraphQl returns data
  return { data: subscribe ? data : (data as any)?.data, status: subscribe ? subStatus : status, addTodo, updateTodo, deleteTodo };
};

export default useTodos;

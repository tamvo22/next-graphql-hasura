import axios from 'axios';

export interface HasuraQuery {
  query: string;
  variables: {};
}

export async function serverFetcher({ query, variables }: HasuraQuery) {
  const axiosServer = axios.create();

  const result = await axiosServer(process.env.HASURA_API_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET!,
    },
    data: {
      query,
      variables,
    },
  });

  return result.data;
}

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  documents: 'src/_utils/hasura/queries/**/*.graphql',
  generates: {
    'src/_utils/hasura/generated/graphql.ts': {
      schema: [
        {
          [`${process.env.HASURA_API_ENDPOINT}`]: {
            headers: {
              'x-hasura-role': 'admin',
              'x-hasura-admin-secret': `${process.env.HASURA_ADMIN_SECRET}`,
            },
          },
        },
      ],
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query', 'typescript-resolvers'],
      config: {
        fetcher: {
          func: 'src/_utils/hasura/generated/useFetcher#useFetcher',
          isReactHook: true,
        },
        exposeQueryKeys: true,
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
};

export default config;

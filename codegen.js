// https://www.graphql-code-generator.com/plugins/typescript-react-query#using-custom-fetcher

module.exports = {
  overwrite: true,
  //watch: true,
  documents: 'src/_hasura/queries/**/*.graphql',
  generates: {
    'src/_hasura/generated/graphql.ts': {
      schema: [
        {
          [`${process.env.HASURA_API_ENDPOINT}`]: {
            headers: {
              'x-hasura-role': 'admin',
              'x-hasura-admin-secret': `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
            },
          },
        },
      ],
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query', 'typescript-resolvers'],
      config: {
        fetcher: {
          func: 'src/_hasura/generated/axiosFetcher#AxiosFetcher',
          isReactHook: true,
        },
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
};

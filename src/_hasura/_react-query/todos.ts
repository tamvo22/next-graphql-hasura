const { createClient } = require('graphqurl');

//https://pablorocha.me/blog/react-query-with-hasura
//https://www.graphql-code-generator.com/plugins/typescript-react-query
//https://www.graphql-code-generator.com/docs/getting-started
//https://javascript.info/websocket

const client = createClient({
  endpoint: 'https://my-graphql-endpoint/graphql',
  headers: {
    'x-access-key': 'mysecretxxx',
  },
});

export const getTodos = async () => {
  const results = await client
    .query({
      query: `
        query ($name: String) {
          users (limit: 1) {
            id
            name
            todos(order_by: {created_at: desc}, limit: 5) {
              id
              title
            }
          }
        }
      `,
      variables: {
        name: 'Alice',
      },
    })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));

  return results.todos;
};

export const setTodos = async () => {
  const results = await client
    .query({
      mutation: `
        mutation m {
          update_users(
            where: { id: {_eq: 85}, _not: {purchased_chapters: {chapter_id: {_eq: 3}}},
            _inc: {coins: -50}
          ) {
            affected_rows
          }
        }
      `,
      variables: {
        name: 'Alice',
      },
    })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));

  return results.todos;
};

/* Subscriptions

const { createClient } = require('graphqurl');
const client = createClient({
  endpoint: 'https://my-graphql-endpoint/graphql',
  headers: {
    'Authorization': 'Bearer Andkw23kj=Kjsdk2902ksdjfkd'
  }
  websocket: {
    endpoint: 'wss://my-graphql-endpoint/graphql',
  }
})

const eventCallback = (event) => {
  console.log('Event received:', event);
  // handle event
};

const errorCallback = (error) => {
  console.log('Error:', error)
};

client.subscribe(
  {
    query: 'subscription { table { column } }',
  },
  eventCallback,
  errorCallback
)
*/

// Hasura Queries
// https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0
// https://hasura.io/blog/getting-started-with-react-query/
// https://www.graphql-code-generator.com/
// https://www.graphql-code-generator.com/plugins/typescript-react-query
// https://github.com/tannerlinsley/react-query/blob/master/examples/basic-graphql-request/src/index.js
// https://pablorocha.me/blog/react-query-with-hasura
// https://blog.logrocket.com/making-graphql-requests-easy-with-react-typescript-and-react-query/
// https://tylerclark.dev/react-query/
// https://react-query.tanstack.com/examples/basic-graphql-request
// https://hasura.io/blog/building-customizable-ecommerce-backend-with-hasura-graphql-apis/


/*CARTS
id - uuid, primary key, unique, default: gen_random_uuid()
customer_id - uuid, nullable
product_id - uuid
store_id - uuid

CUSTOMER
id - uuid, primary key, unique, default: gen_random_uuid()
first_name - text
middle_name - text, nullable
last_name - text
email - text
phone - text
street - text
city - text
state - text
zip - text 
created_at - timestamp with time zone, default: now()
updated_at - timestamp with time zone, default: now()
auth_uid - text, nullable

EMPLOYEES
id - uuid, primary key, unique, default: gen_random_uuid()
first_name - text
last_name - text
email - text
created_at - timestamp with time zone, default: now()
updated_at - timestamp with time zone, default: now()
role - text

INVENTORY
id - uuid, primary key, unique, default: gen_random_uuid()
store_id - uuid
product_id - uuid, nullable
stock_quantity - integer, default: 0

ORDERS
id - uuid, primary key, unique, default: gen_random_uuid()
product_id - uuid
customer_id - uuid
ship_to_id - uuid
order_no - text
status - text
price - numeric
cost - numeric
quantity - numeric
total_price - numeric
created_at - timestamp with time zone, default: now()
updated_at - timestamp with time zone, nullable, default: now()
store_id - uuid

PRODUCTS 
id - uuid, primary key, unique, default: gen_random_uuid()
name - text
price - numeric
cost - numeric
description - text
is_active - boolean, default: false

SHIP_TO
id - uuid, primary key, unique, default: gen_random_uuid()
customer_id - uuid
created_at - timestamp with time zone, default: now()
address_1 - text
address_2 - text, nullable
address_city - text
address_state - text
address_zip - text
address_country - text

STORE
id - uuid, primary key, unique, default: gen_random_uuid()
name - text 
address - text
created_at - timestamp with time zone, default: now()


Types: jsonb, _text, 
Arrays: '{{1,2,3},{4,5,6},{7,8,9}}'

"""

"""
QUERY

-- Object Relationship - One-to-One 
-- Array Relationship - One-to-Many


-- Create table property index for better query performance
SQL: 
CREATE INDEX author_name_index ON authors (name);

query {
  authors {
    id
    name
    articles {
      id
      title
    }
  }
}



"""

"""
MUTATIONS

Insert new object
insert_article (
  objects: [article_insert_input!]!
  on_conflict: article_on_conflict
): article_mutation_response

# response of any mutation on the table "article"
type article_mutation_response {
  # number of affected rows by the mutation
  affected_rows: Int!
  # data of the affected rows by the mutation
  returning: [article!]!
}

# single object insert (supported from v1.2.0)
insert_article_one (
  object: article_insert_input!
  on_conflict: article_on_conflict
): article

******
Upsert is not a substitute for update
The upsert functionality is sometimes confused with the update functionality. However, they work slightly differently. An upsert mutation is used in the case when it’s not clear if the respective row is already present in the database. If it’s known that the row is present in the database, update is the functionality to use.

For an upsert, all columns that are necessary for an insert are required.

How it works

Postgres tries to insert a row (hence all the required columns need to be present)
If this fails because of some constraint, it updates the specified columns


*******
update_article (
  _inc: article_inc_input
  _set: article_set_input
  where: article_bool_exp!
): article_mutation_response

# response of any mutation on the table "article"
type article_mutation_response {
  # number of affected rows by the mutation
  affected_rows: Int!
  # data of the affected rows by the mutation
  returning: [article!]!
}

# single object update (supported from v1.2.0)
update_article_by_pk (
  _inc: article_inc_input
  _set: article_set_input
  # primary key columns arg
  pk_columns: article_pk_columns_input!
): article*

Update all objects
mutation reset_rating {
  update_article (
    where: {}
    _set: { rating: null }
    ) {
    affected_rows
  }
}

Increment/Decrement int columns
You can increment/decrement an int column with a given value using the _inc operator.

mutation update_likes {
  update_article(
    where: {id: {_eq: 1}},
    _inc: {likes: 2} # initial value: 1
    ) {
    affected_rows
    returning {
      id
      likes
    }
  }
}

Update jsonb columns
The currently available jsonb operators are:

Operator	Postgres equivalent	Function
_append	||	append json value to a jsonb column
_prepend	||	prepend json value to a jsonb column
_delete_key	-	delete top-level key from jsonb column
_delete_elem	-	delete array element from jsonb column
_delete_at_path	#-	delete element at a path from jsonb column

*****
Append a json to a jsonb column

mutation update_extra_info($value: jsonb) {
  update_article(
    where: {id: {_eq: 1}},
    _append: {extra_info: $value} # initial value: {"key": "value"}
    ) {
    affected_rows
    returning {
      id
      extra_info
    }
  }
}

{
"value": { "key1": "value1" }
}

*****
Prepend a json to a jsonb column

mutation update_extra_info($value: jsonb) {
  update_article(
    where: {id: {_eq: 1}},
    _prepend: {extra_info: $value} # initial value "{"key": "value", "key1": "value1"}"
    ) {
    affected_rows
    returning {
      id
      extra_info
    }
  }
}


******
Delete a top-level key from a jsonb column

mutation update_extra_info {
  update_article(
    where: {id: {_eq: 1}},
    _delete_key: {extra_info: "key"} # initial value "{"key0": "value0, "key": "value", "key1": "value1"}"
    ) {
    affected_rows
    returning {
      id
      extra_info
    }
  }
}

*****
Delete an element from a jsonb column storing a json array

mutation update_extra_info {
  update_article(
    where: {id: {_eq: 1}},
    _delete_elem: {extra_info: 2} # initial value "["a", "b", "c"]"
    ) {
    affected_rows
    returning {
      id
      extra_info
    }
  }
}

******
Delete an element at a specific path in a jsonb column

mutation update_extra_info {
  update_author(
    where: {id: {_eq: 1}},
    _delete_at_path: {extra_info: ["name", "first"]} # initial value "{"name": {"first": "first_name", "last": "last_name"}}"
    ) {
    affected_rows
    returning {
      id
      extra_info
    }
  }
}

*****
Replace all nested array objects of an object

mutation updateAuthorArticles($author_id: Int!) {
  delete_articles(
    where: {author_id: {_eq: $author_id}}
    ) { 
    affected_rows 
    }
    insert_articles(
      objects: [
        {
          author_id: $author_id,
          title: "title",
          content: "some content"
        },
        {
          author_id: $author_id,
          title: "another title",
          content: "some other content"
        }
      ]
  ) {
  affected_rows
  }
}

{
"author_id": 21
}



********
delete_article (
  where: article_bool_exp!
): article_mutation_response

# response of any mutation on the table "article"
type article_mutation_response {
  # number of affected rows by the mutation
  affected_rows: Int!
  # data of the affected rows by the mutation
  returning: [article!]!
}

# single object delete (supported from v1.2.0)
delete_article_by_pk (
  # all primary key columns args
  id: Int
): article


*******
Delete an object by its primary key

mutation delete_an_object {
  delete_article_by_pk (
  id: 1
  ) {
    id
    title
    user_id
  }
}

*******
Delete objects based on their fields

mutation delete_low_rated_articles {
  delete_article(
  where: {rating: {_lt: 3}}
  ) {
    affected_rows
  }
}

*******
Delete objects based on nested objects’ fields

mutation delete_authors_articles {
  delete_article(
  where: {author: {name: {_eq: "Corny"}}}
  ) {
    affected_rows
  }
}


******
Delete all objects

mutation delete_all_articles {
  delete_article (
  where: {}
  ) {
    affected_rows
  }
}
*/




declare module 'react-query' {
  interface UseInfiniteQueryOptions<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  > extends InfiniteQueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryData,
      TQueryKey
    > {
    optionsParam: string
  }
}

interface MetaData {
  queryKey: Array<string | object>
  pageParam: string | number
}

export const useFetchData =
  <TData, TVariables>(
    query: string,
    options: UseInfiniteQueryOptions,
  ): ((variables?: TVariables, metaData?: MetaData) => Promise<TData>) =>
  async (variables?: TVariables, metaData?: MetaData) => {
    if (metaData?.pageParam != null) {
      variables[options.optionsParam] = metaData.pageParam ?? 0
    }
    const { data } = (await API.graphql({
      query,
      variables: variables as unknown as object,
    })) as GraphQLResult<Promise<TData>>
    return await (data as Promise<TData>)
  }
then in the query we are doing

export const Foo = () => {
  const [queryParams, setQueryParams] = useState<QueryGetFooArgs>({
    limit: 5,
    from: 0,
  })

  const { data, hasNextPage, fetchNextPage } = useInfiniteGetFooQuery(
    {
      limit: 5,
      from: 0,
    },
    {
      optionsParam: 'from',
      getNextPageParam: (lastPage, allPages) => {
        const totalLocal = (allPages.length ?? 0) * (queryParams.limit ?? 1)
        const totalServer =
          lastPage.getFoo.__typename === 'fooList'
            ? lastPage.getFoo.total ?? 0
            : 0
        if (totalLocal < totalServer) {
          return (allPages.length ?? 0) * (queryParams.limit ?? 1)
        }
      },
    },
  )

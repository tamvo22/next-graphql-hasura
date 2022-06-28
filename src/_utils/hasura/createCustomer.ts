import { useHasuraApi, HasuraQuery } from './useHasuraApi';
import { User } from 'next-auth';

/**
 * Create new Hasura Customer entry for Next-Auth Github/Google provider if it customer doesn't exist
 * if customer exists, then check auth_id if empty. If so, update auth_id with new Auth0 provider id
 *
 * @param customer User
 * @returns { id, created_at } with success entry
 */
export async function CreateCustomer(customer: User) {
  const name = customer?.name;

  let firstName, lastName, res;

  if (name.includes(' ')) {
    firstName = name?.split(' ').slice(0, -1).join(' ');
    lastName = name?.split(' ').slice(-1).join(' ');
  } else {
    firstName = name;
    lastName = '';
  }

  const createNewCustomer: HasuraQuery = {
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

  const custId = await GetCustomerByEmail(customer.email);

  if (custId) {
    // customer record exists, update customer auth_id with account auth_id
    res = await UpdateCustomerById(custId, { auth_uid: customer.id });
  } else {
    // customer record doesn't exist, thus it's a new customer
    res = useHasuraApi({ mode: 'server', data: createNewCustomer });
  }

  return res || null;
}

export async function GetCustomerByEmail(email: string): Promise<string | null> {
  const getCustomerEmail: HasuraQuery = {
    query: `
        query MyQuery ($where: customers_bool_exp!) {
          customers(where: $where) {
            id
          }
        }
    `,
    variables: {
      where: {
        email: { _eq: email },
      },
    },
  };

  const res = await useHasuraApi({ mode: 'server', data: getCustomerEmail });

  return res.customers![0]?.id || null;
}

export async function UpdateCustomerById(id: string, data: Record<string, unknown>) {
  const getCustomerEmail: HasuraQuery = {
    query: `
      mutation UpdateCustomerById($pk: customers_pk_columns_input!, $update: customers_set_input!) {
        update_customers_by_pk(pk_columns: $pk, _set: $update) {
          id
          updated_at
        }
      }
    `,
    variables: {
      pk: { id: id },
      update: { ...data },
    },
  };

  const res = await useHasuraApi({ mode: 'server', data: getCustomerEmail });

  return res.customers || null;
}

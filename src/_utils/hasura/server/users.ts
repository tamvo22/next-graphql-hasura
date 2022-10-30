import { AdapterUser } from 'next-auth/adapters';
import { serverFetcher } from './fetcher';
import { nanoid } from 'nanoid';

export const getUser = async (id: string): Promise<AdapterUser | null> => {
  const query = {
    query: `
      query getUserById($id: String!) {
        users_by_pk(id: $id) {
          id
          name
          email
          emailVerified
          image
          role
        }
      }`,
    variables: {
      id,
    },
  };

  const user = await serverFetcher(query);

  return user.data.users_by_pk as AdapterUser;
};

export const queryGetUser = async (where: {}): Promise<AdapterUser | null> => {
  const query = {
    query: `
      query MyQuery ($where: users_bool_exp!){
        users(where: $where, limit: 1) {
          id
          name
          email
          emailVerified
          image
          role
        }
      }`,
    variables: {
      where,
    },
  };

  const res = await serverFetcher(query);

  return res.data.users[0] as AdapterUser;
};

export const createUser = async (user: Omit<AdapterUser, 'id'>): Promise<AdapterUser> => {
  // we'll need to generate the userId
  const id = nanoid(32);

  const creatUser = { id, ...user };

  const query = {
    query: `
      mutation createUser($user: users_insert_input!) {
        insert_users_one(object: $user) {
          id
        }
      }`,
    variables: {
      user: creatUser,
    },
  };

  const res = await serverFetcher(query);

  return res.data.insert_users_one as AdapterUser;
};

export const updateUser = async (user: Partial<AdapterUser>): Promise<AdapterUser> => {
  const { id, ...rest } = user;
  const query = {
    query: `
      mutation updateUser($pk: users_pk_columns_input!, $update: users_set_input!) {
        update_users_by_pk(pk_columns: $pk, _set: $update) {
          id
        }
      }`,
    variables: {
      pk: { id: id },
      update: {
        ...rest,
      },
    },
  };

  const res = await serverFetcher(query);

  return res.data.update_users_by_pk as AdapterUser;
};

export const deleteUser = async (id: string): Promise<AdapterUser> => {
  const query = {
    query: `
      mutation deleteUser($id: String!) {
        delete_users_by_pk(id: $id) {
          id
        }
      }`,
    variables: {
      id: id,
    },
  };

  const res = await serverFetcher(query);

  return res.data.delete_users_by_pk as AdapterUser;
};

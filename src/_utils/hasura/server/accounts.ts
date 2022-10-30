import { Account } from 'next-auth';
import { serverFetcher } from './fetcher';

export const queryGetAccount = async (where: {}): Promise<Account | null> => {
  const query = {
    query: `
      query getAccount($where: accounts_bool_exp!) {
        accounts(where: $where, limit: 1) {
          userId
        }
      }`,
    variables: {
      where,
    },
  };

  const res = await serverFetcher(query);

  return res.data.accounts[0] as Account;
};

export const createAccount = async (account: Account): Promise<Account | null> => {
  const query = {
    query: `
      mutation createAccount($account: accounts_insert_input!) {
        insert_accounts_one(object: $account) {
          id
        }
      }`,
    variables: {
      account,
    },
  };

  const res = await serverFetcher(query);

  return res.data.insert_accounts_one as Account;
};

export const queryDeleteAccount = async (where: {}): Promise<Account | null> => {
  const query = {
    query: `
      mutation deleteAccount($where: accounts_bool_exp!) {
        delete_accounts(where: $where) {
          returning {
            id
          }
        }
      }`,
    variables: {
      where,
    },
  };

  const res = await serverFetcher(query);

  return res.data.delete_accounts.returning[0] as Account;
};

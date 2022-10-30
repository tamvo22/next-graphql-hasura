import { Adapter, AdapterUser } from 'next-auth/adapters';
import { queryGetAccount, createAccount, queryDeleteAccount } from '@/utils/hasura/server/accounts';
import { getUser, queryGetUser, createUser, updateUser, deleteUser } from '@/utils/hasura/server/users';

export default function HasuraAdapter(): Adapter {
  return {
    async createUser(user) {
      const { id } = await createUser(user);
      return { ...user, id } as AdapterUser;
    },
    async getUser(id) {
      return await getUser(id);
    },
    async getUserByEmail(email) {
      return await queryGetUser({ email: { _eq: email } });
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const account = await queryGetAccount({ provider: { _eq: provider }, providerAccountId: { _eq: providerAccountId } });
      if (!account) return null;

      return await getUser(account?.userId!);
    },
    async updateUser(partialUser) {
      return await updateUser(partialUser);
    },
    async deleteUser(userId) {
      return await deleteUser(userId);
    },
    async linkAccount(account) {
      await createAccount(account);
    },
    async unlinkAccount({ provider, providerAccountId }) {
      await queryDeleteAccount({ provider: { _eq: provider }, providerAccountId: { _eq: providerAccountId } });
    },
    // We utilize jwt session so we don't need session adapter methods in our example
    async createSession(session) {
      return { id: '1', ...session };
    },
    async getSessionAndUser(sessionToken) {
      return null;
    },
    async updateSession(partialSession) {
      return null;
    },
    async deleteSession(sessionToken) {
      return null;
    },
    async createVerificationToken(verificationToken) {
      return null;
    },
    async useVerificationToken({ identifier, token }) {
      return null;
    },
  };
}

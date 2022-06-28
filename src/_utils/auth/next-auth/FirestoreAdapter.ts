import { Account } from 'next-auth';
import { Adapter, AdapterUser } from 'next-auth/adapters';
import useUsers from '@/utils/firebase-v9/firebase-admin/firestore/useUsers';
import useAccounts from '@/utils/firebase-v9/firebase-admin/firestore/useAccounts';

export function FirestoreAdapter(): Adapter {
  const fsUsers = useUsers();
  const fsAccounts = useAccounts();

  return {
    async createUser(user) {
      return (await fsUsers.addUser(user)) as AdapterUser;
    },
    async getUser(id) {
      const user = await fsUsers.getUser<AdapterUser>(id);

      return user ? user : null;
    },
    async getUserByEmail(email) {
      const result = await fsUsers.getUserByEmail<AdapterUser>(email);
      return result;
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const account = await fsAccounts.getAccount<Account>({ provider, providerAccountId });
      if (!account) return null;

      const user = await fsUsers.getUser<AdapterUser>(account?.userId!);
      return user ? user : null;
    },
    async updateUser(partialUser) {
      const user = await fsUsers.updateUser<AdapterUser>(partialUser);

      return user!;
    },
    async deleteUser(userId) {
      await fsUsers.deleteUser(userId);
      await fsAccounts.deleteAccountByUserId(userId);

      return null;
    },
    async linkAccount(account) {
      return (await fsAccounts.addAccount<Account>(account)) as Account;
    },
    async unlinkAccount({ provider, providerAccountId }) {
      await fsAccounts.deleteAccount({ provider, providerAccountId });
    },
    // We utilize jwt so we don't need session in our example
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

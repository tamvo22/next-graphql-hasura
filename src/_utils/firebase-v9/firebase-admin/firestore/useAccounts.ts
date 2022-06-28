import { getFirestore } from 'firebase-admin/firestore';
import firebaseAdmin from '@/utils/firebase-v9/firebase-admin/initFirebaseAdmin';
import { queryToObj } from '@/utils/firebase-v9/FirestoreHelper';

const fs = getFirestore(firebaseAdmin);

export default function useAccounts() {
  const Accounts = fs.collection('accounts');

  return {
    async addAccount<T>(account: T): Promise<T & { id: string }> {
      const { id } = await Accounts.add(account);
      return { ...account, id };
    },
    async getAccount<T>({ provider, providerAccountId }: { provider: string; providerAccountId: string }): Promise<T> {
      const ref = Accounts.where('provider', '==', provider).where('providerAccountId', '==', providerAccountId).limit(1);
      return (await ref.get().then((query) => queryToObj(query))) as T;
    },
    async deleteAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }) {
      const ref = Accounts.where('provider', '==', provider).where('providerAccountId', '==', providerAccountId).limit(1);
      const accountDocs = await ref.get();

      if (accountDocs.empty) return;
      await fs.runTransaction(async (transaction) => {
        transaction.delete(accountDocs.docs[0]?.ref!);
      });
    },
    async deleteAccountByUserId(userId: string) {
      const ref = Accounts.where('userId', '==', userId);
      const accountDocs = await ref.get();

      if (accountDocs.empty) return;
      await fs.runTransaction(async (transaction) => {
        accountDocs.forEach((account) => transaction.delete(account.ref));
      });
    },
  };
}

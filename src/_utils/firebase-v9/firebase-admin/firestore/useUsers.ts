import { getFirestore } from 'firebase-admin/firestore';
import firebaseAdmin from '@/utils/firebase-v9/firebase-admin/initFirebaseAdmin';
import { docToObj, queryToObj } from '@/utils/firebase-v9/FirestoreHelper';

const fs = getFirestore(firebaseAdmin);

export default function useUsers() {
  const Users = fs.collection('users');

  return {
    async addUser<T>(user: Omit<T, 'id'>): Promise<Omit<T, 'id'> & { id: string }> {
      const { id } = await Users.add(user);
      return { ...user, id };
    },
    async getUser<T>(id: string): Promise<T | null> {
      return (await Users.doc(id)
        .get()
        .then((doc) => docToObj(doc))) as T;
    },
    async getUserByEmail<T>(email: string): Promise<T> {
      const ref = Users.where('email', '==', email).limit(1);
      return (await ref.get().then((query) => queryToObj(query))) as T;
    },
    async updateUser<T>(user: Partial<T>): Promise<T | null> {
      const { id, ...data } = user as any;
      await Users.doc(id!).update(data);
      return (await Users.doc(id!)
        .get()
        .then((doc) => docToObj(doc))) as T;
    },
    async deleteUser(id: string): Promise<void> {
      await Users.doc(id!).delete();
    },
  };
}

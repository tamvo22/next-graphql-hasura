import { getFirestore } from 'firebase-admin/firestore';
import firebaseAdmin from '@/utils/firebase-v9/firebase-admin/initFirebaseAdmin';
import { docToObj, queryToObjs, QueryResult } from '@/utils/firebase-v9/FirestoreHelper';

const fs = getFirestore(firebaseAdmin);

export default function useTodo() {
  const Todo = fs.collection('todos');

  return {
    async add<T>(todo: Omit<T, 'id'>): Promise<Omit<T, 'id'> & { id: string }> {
      const { id } = await Todo.add(todo);
      return { ...todo, id };
    },
    async get(): Promise<QueryResult[] | null> {
      const ref = Todo.orderBy('createAt', 'desc');
      return await ref.get().then((doc) => queryToObjs(doc));
    },
    async update<T>(id: string, todo: Partial<T>): Promise<QueryResult | null> {
      await Todo.doc(id!).update(todo);
      return await Todo.doc(id!)
        .get()
        .then((doc) => docToObj(doc));
    },
    async delete(id: string): Promise<FirebaseFirestore.WriteResult> {
      return await Todo.doc(id!).delete();
    },
  };
}


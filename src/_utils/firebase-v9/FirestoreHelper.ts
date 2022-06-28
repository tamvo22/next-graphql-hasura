import { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { DocumentSnapshot as AdminDocumentSnapshot, QuerySnapshot as AdminQuerySnapshot } from 'firebase-admin/firestore';

export interface QueryResult {
  id: string;
  [x: string]: any;
}

/**
 * Convert Firestore timestamp to Date object
 * @param data - QueryResult
 * @returns QueryResult
 */
export function ToDate(data: QueryResult) {
  for (const key in data) {
    const value = data[key];
    if (value?.toDate) data[key] = value.toDate();
    else data[key] = value;
  }
  return data;
}

/**
 * return the document object
 * @param document - DocumentSnapshot | AdminDocumentSnapshot
 * @returns DocumentSnapshot
 */
export function docToObj(document: DocumentSnapshot | AdminDocumentSnapshot): QueryResult | null {
  if (!document.exists) return null;

  return ToDate({ id: document.id, ...document.data() });
}

/**
 * return a list of query found
 * @param query - QuerySnapshot | AdminQuerySnapshot
 * @returns Query[] | null
 */
export function queryToObjs(query: QuerySnapshot | AdminQuerySnapshot): QueryResult[] | null {
  if (query.empty) return null;

  return query.docs.map((doc) => ToDate({ id: doc.id, ...doc.data() }));
}

/**
 * return first item of query found
 * @param query - QuerySnapshot | AdminQuerySnapshot
 * @returns Query | null
 */
export function queryToObj(query: QuerySnapshot | AdminQuerySnapshot): QueryResult | null {
  if (query.empty) return null;

  return ToDate({ id: query.docs[0]?.id, ...query.docs[0]?.data() });
}

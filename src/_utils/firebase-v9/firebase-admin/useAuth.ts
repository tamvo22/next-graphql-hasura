import { getAuth } from 'firebase-admin/auth';
import firebaseAdmin from '@/utils/firebase-v9/firebase-admin/initFirebaseAdmin';

let adminAuth = getAuth(firebaseAdmin);

export async function getUser(uid: string) {
  return adminAuth.getUser(uid);
}
export async function verifyIdToken(idToken: string) {
  let checkRevoked = true;
  return await adminAuth
    .verifyIdToken(idToken, checkRevoked)
    .then((decodedToken) => {
      return decodedToken;
    })
    .catch((error) => {
      return error;
    });
}
/** Method to set user roles. Only user with Admin role can set roles. */
export async function grantUserRole(uid: string, role: string) {
  const user = await adminAuth.getUser(uid);
  return await adminAuth.setCustomUserClaims(user?.uid, { role: role });
}

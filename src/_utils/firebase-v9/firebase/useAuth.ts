import firebaseApp from '@/utils/firebase-v9/firebase/initFirebase';
import {
  initializeAuth,
  inMemoryPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
} from 'firebase/auth';

// disable Firebase persistent session state management
const firebaseAuth = initializeAuth(firebaseApp, { persistence: [inMemoryPersistence] });

export default function useAuth() {
  return {
    async getIdToken() {
      return await firebaseAuth.currentUser!.getIdToken(true).catch((error) => null);
    },
    async signIn(email: string, password: string) {
      return await signInWithEmailAndPassword(firebaseAuth, email, password).catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            return 'Incorrect email';
          case 'auth/wrong-password':
            return 'Incorrect password';
          case 'auth/too-many-requests':
            return 'Your account is locked due to too many attempts.';
          default:
            return 'Incorrect username or password';
        }
      });
    },
    async signUp(email: string, password: string) {
      return await createUserWithEmailAndPassword(firebaseAuth, email, password).catch((error) => ({ error: error }));
    },
    async signOut() {
      return await fbSignOut(firebaseAuth).catch((error) => ({ error: error }));
    },
  };
}

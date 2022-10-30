import { AppOptions, cert, getApp, getApps, initializeApp, ServiceAccount } from 'firebase-admin/app';

const FirebaseAdminPrivateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
const FirebaseProjectID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_DATABASE_URL = 'https://' + FirebaseProjectID + '.firebaseio.com';

const credentials: ServiceAccount = {
  projectId: FirebaseProjectID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: FirebaseAdminPrivateKey?.replace(/\\n/g, '\n'),
};

const firebaseConfig: AppOptions = {
  credential: cert(credentials),
  databaseURL: FIREBASE_DATABASE_URL,
};

const firebaseAdmin = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export default firebaseAdmin;

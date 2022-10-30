import { getApp, getApps, initializeApp } from 'firebase/app';

const FirebaseProjectID = process.env.FIREBASE_PROJECT_ID;

const FIREBASE_AUTH_DOMAIN = FirebaseProjectID + '.firebaseapp.com';
const FIREBASE_DATABASE_URL = 'https://' + FirebaseProjectID + '.firebaseio.com';
const FIREBASE_STORAGE_BUCKET = FirebaseProjectID + '.appspot.com';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FirebaseProjectID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default firebaseApp;

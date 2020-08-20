import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const groupsCollection = firestore.collection('groups');
export const usersCollection = firestore.collection('users');

export const seedAllMounts = async (mounts = []) => {
  if (!mounts) return;

  const mountsCollection = firestore.collection('mounts');
  const snapShot = await mountsCollection.get();

  mounts.forEach(async mount => {
    await mountsCollection.add(mount);
  });
};

export const seedAllMinions = async (minions = []) => {
  if (!minions) return;

  const minionsCollection = firestore.collection('minions');
  const snapShot = await minionsCollection.get();

  minions.forEach(async mount => {
    await minionsCollection.add(mount);
  });
};

export const createUserDocument = async (authUser, additionalData = {}) => {
  if (!authUser) return;

  const userRef = firestore.doc(`users/${authUser.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, uid } = authUser;
    const createdAt = new Date(Date.now());

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        characterLinkID: uuidv4(),
        uid,
        ...additionalData
      });
    } catch (err) {
      console.error(err);
    }
  }

  return userRef;
};

const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

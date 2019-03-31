import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import config from '~/firebase.config';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const authProviders = {
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID
};
export const auth = firebase.auth();
export const db = firebase.database();
export const store = firebase.firestore();
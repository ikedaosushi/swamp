import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import config from '~/firebase.config';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const authProviders = {
  Email: firebase.auth.EmailAuthProvider.PROVIDER_ID,
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  Facebook: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  Twitter: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  Github: firebase.auth.GithubAuthProvider.PROVIDER_ID
};

export const auth = firebase.auth();
export const db = firebase.firestore();

// db.collection("users").add({
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// })
// .then(function(docRef) {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//   console.error("Error adding document: ", error);
// });

// db.collection("users").add({
//   first: "Alan",
//   middle: "Mathison",
//   last: "Turing",
//   born: 1912
// })
// .then(function(docRef) {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//   console.error("Error adding document: ", error);
// });

// db.collection("users").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//   });
// });
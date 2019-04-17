const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
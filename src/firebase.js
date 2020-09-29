import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDtbhzedeaDRN-fyGq_hKzhsoeaZrA3Zkc",
  authDomain: "react-firebase-instagramclone.firebaseapp.com",
  databaseURL: "https://react-firebase-instagramclone.firebaseio.com",
  projectId: "react-firebase-instagramclone",
  storageBucket: "react-firebase-instagramclone.appspot.com",
  messagingSenderId: "620868462861",
  appId: "1:620868462861:web:848fd6c52147e7a83b6844",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

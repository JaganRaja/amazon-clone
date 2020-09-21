import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDs0x4twuFPz7bor3cpOI2ahNf3ckx9vDM",
  authDomain: "challenge-9897b.firebaseapp.com",
  databaseURL: "https://challenge-9897b.firebaseio.com",
  projectId: "challenge-9897b",
  storageBucket: "challenge-9897b.appspot.com",
  messagingSenderId: "8825484534",
  appId: "1:8825484534:web:b81b36e2dcbf3859ab68d7",
  measurementId: "G-JLFPGWW53N",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };

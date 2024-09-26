import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjHn1XfO33iPfHhC_GKOWEtCJNmomzRog",
  authDomain: "ia-7849c.firebaseapp.com",
  projectId: "ia-7849c",
  storageBucket: "ia-7849c.appspot.com",
  messagingSenderId: "139273393266",
  appId: "1:139273393266:web:aa17341ca850904be79eeb",
  measurementId: "G-RX0G22YX1N",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db };

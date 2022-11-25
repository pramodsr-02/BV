import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAuhurmAsHlIZAbWQANLRlVwybkUlg4Wdc",
  authDomain: "matrimony-b3327.firebaseapp.com",
  databaseURL: "https://matrimony-b3327-default-rtdb.firebaseio.com",
  projectId: "matrimony-b3327",
  storageBucket: "matrimony-b3327.appspot.com",
  messagingSenderId: "1074479741881",
  appId: "1:1074479741881:web:e3db4bc6e669c27ba1d468",
  measurementId: "G-6E000SWV97"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };

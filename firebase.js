import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"


const firebaseConfig = {
  apiKey: "AIzaSyB0Jeb3M0Gboe12LsHtx-uCdymzUhykpOo",
  authDomain: "disney-movies-data.firebaseapp.com",
  databaseURL: "https://disney-movies-data-default-rtdb.firebaseio.com",
  projectId: "disney-movies-data",
  storageBucket: "disney-movies-data.appspot.com",
  messagingSenderId: "838069265228",
  appId: "1:838069265228:web:c00dc9371bbe6b99a3a5e9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage =firebase.storage();

export { auth,provider,storage};
export default db;
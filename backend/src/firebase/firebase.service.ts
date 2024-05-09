import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {
  getDatabase as getDb,
  ref as dbRef,
  set as dbSet,
  get as dbGet,
  child as dbChild,
  push,
  orderByChild,
  equalTo,
  remove as dbRemove,
  update as dbUpdate,
} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDSqxC_xkmpFjeRg9yJMXp48rGzYmD8pFI",
    authDomain: "podcast-4073a.firebaseapp.com",
    projectId: "podcast-4073a",
    storageBucket: "podcast-4073a.appspot.com",
    messagingSenderId: "646206095901",
    appId: "1:646206095901:web:f7c10e06372ee02653fcf4",
    measurementId: "G-CY6CKNY1X1"
  };

const appInstance = initializeApp(firebaseConfig);
const dbInstance = getDb(appInstance);
const auth = getAuth(appInstance);
const authDomain = dbRef(dbInstance);
export {
  appInstance as app,
  dbInstance as db,
  dbRef,
  dbSet,
  dbGet,
  dbChild,
  push,
  orderByChild,
  equalTo,
  getStorage,
  sRef,
  uploadBytesResumable,
  getDownloadURL,
  dbRemove,
  dbUpdate,
  auth,
  authDomain,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
};

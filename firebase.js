// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvQ6XemyvqkQswd6r_sdcDkqDudUbHCGY",
  authDomain: "learning-firebase-26.firebaseapp.com",
  databaseURL: "https://learning-firebase-26.firebaseio.com",
  projectId: "learning-firebase-26",
  storageBucket: "learning-firebase-26.appspot.com",
  messagingSenderId: "620876442565",
  appId: "1:620876442565:web:1b987e6577ed4e96b8f9ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const createUser_ = createUserWithEmailAndPassword;
export const signOut_ = signOut;
export const signIn_ = signInWithEmailAndPassword;
export const db = getFirestore();
export const collection_ = collection;
export const addDoc_ = addDoc;

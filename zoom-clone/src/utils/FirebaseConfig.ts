// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {collection,getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdbltd0D_vUqzF4QwEm_zQQqwmj8yzWic",
  authDomain: "zoom-clone-210f1.firebaseapp.com",
  projectId: "zoom-clone-210f1",
  storageBucket: "zoom-clone-210f1.appspot.com",
  messagingSenderId: "339314970539",
  appId: "1:339314970539:web:590aaeef40758f13840cee",
  measurementId: "G-RTEY22F6B3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app)
export const firebaseDB=getFirestore(app);

export const userRef=collection(firebaseDB,"users");   //iski madath se jitne bhi users h collection mai vo sab firebase kai database mai store ho jage(collection denotes users)
export const meetingRef=collection(firebaseDB,"meetings");
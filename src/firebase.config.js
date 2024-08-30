// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr5mu6kGk9xH00VNyLl-Eo8wbtxAYvSPs",
  authDomain: "jobfinder-6249e.firebaseapp.com",
  projectId: "jobfinder-6249e",
  storageBucket: "jobfinder-6249e.appspot.com",
  messagingSenderId: "124746922292",
  appId: "1:124746922292:web:d67408eaaab0dc29488d61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};
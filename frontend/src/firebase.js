// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWepdfohXVKcg2AyCbEY8CLrK06_DZEVA",
  authDomain: "ecommerce-68431.firebaseapp.com",
  projectId: "ecommerce-68431",
  storageBucket: "ecommerce-68431.firebasestorage.app",
  messagingSenderId: "704423967550",
  appId: "1:704423967550:web:5ab8ba33cfb7169ff48a6f",
  measurementId: "G-KHM772L43T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export  const auth= getAuth(app);
export  const db = getFirestore(app);




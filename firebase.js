import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCy7be148XgqVLxsxbJGD8h7ehm1cL9Mto",
    authDomain: "simpricio-93bd3.firebaseapp.com",
    projectId: "simpricio-93bd3",
    storageBucket: "simpricio-93bd3.appspot.com",
    messagingSenderId: "799217123522",
    appId: "1:799217123522:web:7b5c8ed0ed0d9609c67b5b",
    measurementId: "G-DR3HZK8WCN"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);

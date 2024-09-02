import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLLumFJAE1OjDDF3UkScA8-KaPPn9YaoA",
  authDomain: "sar-tite-a6a3b.firebaseapp.com",
  projectId: "sar-tite-a6a3b",
  storageBucket: "sar-tite-a6a3b.appspot.com",
  messagingSenderId: "448217204941",
  appId: "1:448217204941:web:53fbd61b98827810234184",
  measurementId: "G-KVYPXBWEJ0"
};

const app = initializeApp(firebaseConfig);
// console.log("Firebase App Initialized:", app);
export const auth = getAuth(app);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "tugasakhir-ku.firebaseapp.com",
    projectId: "tugasakhir-ku",
    storageBucket: "tugasakhir-ku.appspot.com",
    messagingSenderId: "80754325127",
    appId: "1:80754325127:web:8deadc92429bfd62b62a22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const siswasCollectionRef = collection(db, "siswas");

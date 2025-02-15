
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    // paste your firebase config here
    apiKey: "AIzaSyAnDYXcYgYXy4932LjLbvV4U3ZPveEj2as",
    authDomain: "rohitquiz-204c5.firebaseapp.com",
    projectId: "rohitquiz-204c5",
    storageBucket: "rohitquiz-204c5.appspot.com",
    messagingSenderId: "119848447467",
    appId: "1:119848447467:web:b1f938b8cc1b0110b27dae",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export { storage, db };
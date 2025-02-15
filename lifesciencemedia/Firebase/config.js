
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAb7RWR5w_WNTN5WWfSYHfgjkUoXZo8pgU",
  authDomain: "lifesciencemedia1.firebaseapp.com",
  projectId: "lifesciencemedia1",
  storageBucket: "lifesciencemedia1.firebasestorage.app",
  messagingSenderId: "995926691788",
  appId: "1:995926691788:web:79414e87b654a0e4a2d769",
  measurementId: "G-FEXE4YSW19"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }


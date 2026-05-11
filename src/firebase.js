// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs, updateDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || "demo.firebaseapp.com",
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID || "demo",
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_APP_ID || "1:000000000000:web:demo",
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let analytics = null;

if (firebaseConfig.projectId && firebaseConfig.appId && firebaseConfig.measurementId) {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((error) => {
      console.warn("Firebase Analytics non disponibile:", error);
    });
}

export const auth = getAuth(app);
export { db, analytics };

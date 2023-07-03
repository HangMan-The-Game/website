// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7gDqzjRwgqYzwc9dBuECjtuSOZEUjo5w",
  authDomain: "hangman-it.firebaseapp.com",
  databaseURL: "https://hangman-it-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hangman-it",
  storageBucket: "hangman-it.appspot.com",
  messagingSenderId: "289172173290",
  appId: "1:289172173290:web:37658d17b12032296b4293",
  measurementId: "G-6YJ5BS3TLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
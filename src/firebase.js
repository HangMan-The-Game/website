// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, setAnalyticsCollectionEnabled } from "firebase/analytics";
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
let analyticsInitialization = null;

const clearAnalyticsCookies = () => {
  if (typeof document === "undefined") {
    return;
  }

  const host = window.location.hostname;
  const domains = [host, `.${host}`];

  document.cookie.split(";").forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();

    if (cookieName === "_ga" || cookieName.startsWith("_ga_")) {
      document.cookie = `${cookieName}=; Max-Age=0; path=/; SameSite=Lax`;
      domains.forEach((domain) => {
        document.cookie = `${cookieName}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
      });
    }
  });
};

const initializeAnalytics = async () => {
  if (!firebaseConfig.measurementId) {
    return null;
  }

  if (analytics) {
    return analytics;
  }

  if (!analyticsInitialization) {
    analyticsInitialization = isSupported()
      .then((supported) => {
        if (!supported) {
          return null;
        }

        analytics = getAnalytics(app);
        return analytics;
      })
      .catch((error) => {
        console.warn("Firebase Analytics non disponibile:", error);
        return null;
      });
  }

  return analyticsInitialization;
};

export const setAnalyticsConsent = async (granted) => {
  if (granted) {
    const analyticsInstance = await initializeAnalytics();

    if (analyticsInstance) {
      setAnalyticsCollectionEnabled(analyticsInstance, true);
    }

    return;
  }

  if (analytics) {
    setAnalyticsCollectionEnabled(analytics, false);
  }

  clearAnalyticsCookies();
};

export const auth = getAuth(app);
export { db, analytics };

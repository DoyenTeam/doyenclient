import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_yd11kNJTMuFMM-wp_j2EgV-QzFAFUJE",
    authDomain: "doyen-5cf7d.firebaseapp.com",
    projectId: "doyen-5cf7d",
    storageBucket: "doyen-5cf7d.appspot.com",
    messagingSenderId: "763165773076",
    appId: "1:763165773076:web:a419298b7dca30f1ed4601",
    measurementId: "G-SWYY5VNB74"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
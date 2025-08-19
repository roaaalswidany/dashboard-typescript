// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGS2MBc_fKovILnMjEOcLEg7Z8yEq--0k",
  authDomain: "dashboard-roaa.firebaseapp.com",
  databaseURL: "https://dashboard-roaa-default-rtdb.firebaseio.com",
  projectId: "dashboard-roaa",
  storageBucket: "dashboard-roaa.firebasestorage.app",
  messagingSenderId: "691125494898",
  appId: "1:691125494898:web:0bf24f603856c428338eeb",
  measurementId: "G-1PY890VY25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const  database = getDatabase(app)
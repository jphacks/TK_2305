// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlzmVDTGx38fQ4Q5Wu5RPLvk8lh0IF8EU",
  authDomain: "wasuremono-be85c.firebaseapp.com",
  projectId: "wasuremono-be85c",
  storageBucket: "wasuremono-be85c.appspot.com",
  messagingSenderId: "95677971196",
  appId: "1:95677971196:web:8ae88379366e96166b3579",
  measurementId: "G-Y460KS885H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

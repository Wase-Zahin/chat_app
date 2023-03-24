// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkuqoy5RICTjd0Tv2bDg10YdTJx-RzzXE",
  authDomain: "chat-6353f.firebaseapp.com",
  projectId: "chat-6353f",
  storageBucket: "chat-6353f.appspot.com",
  messagingSenderId: "1098236165647",
  appId: "1:1098236165647:web:496d9600b2177c68a0ed7a",
  measurementId: "G-5D72S4HTGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const db = getFirestore(app)
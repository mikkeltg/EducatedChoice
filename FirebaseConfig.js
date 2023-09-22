// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ5ev4aFTWGFI5kqWXVtMcvhLgylXBL6Q",
  authDomain: "educated-choice.firebaseapp.com",
  projectId: "educated-choice",
  storageBucket: "educated-choice.appspot.com",
  messagingSenderId: "416843846158",
  appId: "1:416843846158:web:20fd7a2ab2428c8017225f",
  measurementId: "G-ELSS69HT2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {firebaseConfig};
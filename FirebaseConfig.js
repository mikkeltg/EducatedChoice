// Import the function needed
import { initializeApp } from "firebase/app";

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


export {firebaseConfig};
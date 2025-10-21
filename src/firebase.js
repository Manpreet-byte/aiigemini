// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDglqw5J_SW8HixjqVLKAy_9nK3ujb5MhM",
  authDomain: "myaiii.firebaseapp.com",
  projectId: "myaiii",
  storageBucket: "myaiii.firebasestorage.app",
  messagingSenderId: "975491646257",
  appId: "1:975491646257:web:b5e9162dd5587865126610"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

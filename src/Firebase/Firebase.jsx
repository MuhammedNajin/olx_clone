

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCCTzKQb82nHSjkwyIZzPXqFSmWhKSyYyQ",
  authDomain: "olx-react-bcad3.firebaseapp.com",
  projectId: "olx-react-bcad3",
  storageBucket: "olx-react-bcad3.appspot.com",
  messagingSenderId: "489912329337",
  appId: "1:489912329337:web:aca837b6576b83958660a8",
  measurementId: "G-ECRRRRBXH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
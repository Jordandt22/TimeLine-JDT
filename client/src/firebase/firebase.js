import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";
import { getAuth } from "firebase/auth";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD7Ef8X4H17PqbluT4q-VWPGe3ZBn1jlcY",
  authDomain: "timeline-cc71a.firebaseapp.com",
  projectId: "timeline-cc71a",
  storageBucket: "timeline-cc71a.appspot.com",
  messagingSenderId: "800022885845",
  appId: "1:800022885845:web:a88c150751de9bcb35b95c",
  measurementId: "G-0GKB6M4TJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getPerformance(app);

// Auth
export const Auth = getAuth();
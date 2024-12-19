
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "triviareactgame.firebaseapp.com",
  projectId: "triviareactgame",
  storageBucket: "triviareactgame.firebasestorage.app",
  messagingSenderId: "144678066068",
  appId: "1:144678066068:web:779d9c796893a89d4b6181"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
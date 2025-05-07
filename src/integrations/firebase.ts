import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0HWfV8u3cWH-M1UFu7XCjmnNu61Hm-FE",
  authDomain: "oldie-market.firebaseapp.com",
  projectId: "oldie-market",
  storageBucket: "oldie-market.firebasestorage.app",
  messagingSenderId: "554621577375",
  appId: "1:554621577375:web:529415ef9c50e7475fdaaa"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

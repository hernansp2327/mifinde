import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

console.log("Firebase cargado");

const firebaseConfig = {
  apiKey: "AIzaSyDcf8pTadIrkciFusqvSEMCBJM7IFZ-2as",
  authDomain: "mifinde-d315b.firebaseapp.com",
  projectId: "mifinde-d315b",
  storageBucket: "mifinde-d315b.firebasestorage.app",
  messagingSenderId: "579755108479",
  appId: "1:579755108479:web:33a8d2e3664a1fbb92b74a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); // 🔥 ESTA LÍNEA SOLUCIONA TODO
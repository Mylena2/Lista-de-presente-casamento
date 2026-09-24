import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTI7OEJCyOaR7M7YJALaWMshRR4v_AN7w",
  authDomain: "lista-casamento-gabriel-luana.firebaseapp.com",
  projectId: "lista-casamento-gabriel-luana",
  storageBucket: "lista-casamento-gabriel-luana.firebasestorage.app",
  messagingSenderId: "513571570901",
  appId: "1:513571570901:web:bef87624c6c189fadd8e5c",
  measurementId: "G-RQXJ8D3WDW"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
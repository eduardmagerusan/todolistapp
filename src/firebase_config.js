import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAC3AiXQXDXgpoWSjLn2C6pqTyi2fTzbs0",
    authDomain: "todolistapp-819bf.firebaseapp.com",
    projectId: "todolistapp-819bf",
    storageBucket: "todolistapp-819bf.appspot.com",
    messagingSenderId: "5140288570",
    appId: "1:5140288570:web:70794407b9f1ce2e92d103"
  };

  // Initiliaze Firebase
  const app = initializeApp(firebaseConfig);
  
  // Initiliaze Firestore
  const db = getFirestore();

  export { db };


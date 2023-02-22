// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnzNTBNrX2dAvcQZ6R9R8IXk7kdsw8mpc",
  authDomain: "note-app-1f748.firebaseapp.com",
  projectId: "note-app-1f748",
  storageBucket: "note-app-1f748.appspot.com",
  messagingSenderId: "788964550625",
  appId: "1:788964550625:web:ebd082ecff9368b435d4a0",
  measurementId: "G-D23WB1CXSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
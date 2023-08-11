// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT92S7FkxJeR10Oh_HCP8lx8ZjEVoSV2A",
  authDomain: "react-blog-cdeb7.firebaseapp.com",
  projectId: "react-blog-cdeb7",
  storageBucket: "react-blog-cdeb7.appspot.com",
  messagingSenderId: "225549739180",
  appId: "1:225549739180:web:b7814f707f413ad60cab09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initallize CLoud Firestore and get a reference to the service
export const db = getFirestore(app);
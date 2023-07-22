import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "re-events-bf906.firebaseapp.com",
  projectId: "re-events-bf906",
  storageBucket: "re-events-bf906.appspot.com",
  messagingSenderId: "53235890711",
  appId: "1:53235890711:web:741b046b8e87c184ab7a52",
  databaseURL: "https://re-events-bf906-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

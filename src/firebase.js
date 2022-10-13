import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBvCWln5_cmfbXNrMqzUoexLCid7LpKDgg",
    authDomain: "messenger-33b6e.firebaseapp.com",
    projectId: "messenger-33b6e",
    storageBucket: "messenger-33b6e.appspot.com",
    messagingSenderId: "1091126096618",
    appId: "1:1091126096618:web:cde0daf1024a5309259d93",
    measurementId: "G-YC5DG3S4ZZ"
  });

  const db = firebaseApp.firestore();

  export default db;
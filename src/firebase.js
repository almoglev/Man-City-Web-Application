// import firebase from 'firebase/app';
// import 'firebase/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
;

const firebaseConfig = {
    apiKey: "AIzaSyBVda_CD_oJpTGYX6S42iupDAlzufgcjRk",
    authDomain: "man-city-51674.firebaseapp.com",
    projectId: "man-city-51674",
    storageBucket: "man-city-51674.appspot.com",
    messagingSenderId: "1017050222398",
    appId: "1:1017050222398:web:4dcfa5e7af88e2e460a66f",
    measurementId: "G-FYXJ4JQB11"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  export {
      firebase
  }
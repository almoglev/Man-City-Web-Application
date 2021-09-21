// import firebase from 'firebase/app';
// import 'firebase/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// import {cityDb} from './temp/m-city-export';

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

  // Inserting the data (collections) from m-city-export.js into firebase
  const DB = firebase.firestore();
  const matchesCollection = DB.collection('matches');
  const playersCollection = DB.collection('players');
  const positionsCollection = DB.collection('positions');
  const promotionsCollection = DB.collection('promotions');
  const teamsCollection = DB.collection('teams');

//   cityDb.matches.forEach(item=>{
//     matchesCollection.add(item)
//   });

//   cityDb.players.forEach(item=>{
//     playersCollection.add(item)
//   });

//   cityDb.positions.forEach(item=>{
//     positionsCollection.add(item)
//   });

//   cityDb.promotions.forEach(item=>{
//     promotionsCollection.add(item)
//   });

//   cityDb.teams.forEach(item=>{
//     teamsCollection.add(item)
//   });

  export {
      firebase,
      matchesCollection,
      playersCollection,
      positionsCollection,
      promotionsCollection,
      teamsCollection
  }
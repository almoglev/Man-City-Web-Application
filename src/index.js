import React from 'react';
import ReactDOM from 'react-dom';
import  './Resources/css/app.css'
import Routes from './routes';
import {firebase} from './firebase';

const App = (props) => {
  // the props here is the object that says if the user is authenticated or not
  return(
    <Routes {...props} />
  )
}


// a listener that listens all the time when the app starts to see if a user logs in
// whenever theres a change of the auth state of the app, its going to fire
// onAuthStateChanged function
firebase.auth().onAuthStateChanged((user)=>{
  ReactDOM.render(<App user={user}/>,document.getElementById('root'));
})
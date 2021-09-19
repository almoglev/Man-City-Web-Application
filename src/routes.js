import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './Components/Header_Footer/footer';
import Header from './Components/Header_Footer/header';
import Home from './Components/Home';
import SignIn from './Components/Signin';

import AuthGuard from './Hoc/Auth';
import Dashboard from './Components/Admin/Dashboard';
import AdminPlayers from './Components/Admin/Players'
import AddEditPlayer from './Components/Admin/Players/add_edit_players';


// user is the signed user
const Routes = ({user}) => {

  return (
    <BrowserRouter>
    
      <Header user={user}/>
      
      <Switch>
        <Route path="/admin_players/add_player" exact component={AuthGuard(AddEditPlayer)}/>
        <Route path="/admin_players/edit_player/:playerid" exact component={AuthGuard(AddEditPlayer)}/>
        <Route path="/admin_players" exact component={AuthGuard(AdminPlayers)}/>
        <Route path="/dashboard" exact component={AuthGuard(Dashboard)}/>
        <Route path="/sign_in" exact component={
          props=>(<SignIn {...props} user={user}/>)
        
        }/>
        <Route path="/" exact component={Home}/>
      </Switch>

      <ToastContainer/>
      <Footer/>

    </BrowserRouter>
  );
}

export default Routes;

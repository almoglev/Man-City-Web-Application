import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './Components/Header_Footer/footer';
import Header from './Components/Header_Footer/header';
import Home from './Components/Home';
import SignIn from './Components/Signin';
import TheTeam from './Components/The_Team';
import TheMatches from './Components/The_Matches';
import NotFound from './Components/Not_Found/not_found';

import AuthGuard from './Hoc/Auth';
import Dashboard from './Components/Admin/Dashboard';
import AdminPlayers from './Components/Admin/Players';
import AddEditPlayer from './Components/Admin/Players/add_edit_players';
import AdminMatches from './Components/Admin/Matches';
import AddEditMatch from './Components/Admin/Matches/add_edit_matches';


// user is the signed user
const Routes = ({user}) => {

  return (
    <BrowserRouter>
    
      <Header user={user}/>
      
      <Switch>
        <Route path="/admin_matches/add_match" component={AuthGuard(AddEditMatch)}/>
        <Route path="/admin_matches/edit_match/:matchid" component={AuthGuard(AddEditMatch)}/>
        <Route path="/admin_matches" component={AuthGuard(AdminMatches)}/>

        <Route path="/admin_players/add_player" component={AuthGuard(AddEditPlayer)}/>
        <Route path="/admin_players/edit_player/:playerid" component={AuthGuard(AddEditPlayer)}/>
        <Route path="/admin_players" component={AuthGuard(AdminPlayers)}/>
        
        <Route path="/dashboard" component={AuthGuard(Dashboard)}/>
        <Route path="/the_team" component={TheTeam}/>
        <Route path="/matches" component={TheMatches}/>
        <Route path="/sign_in" component={
          props=>(<SignIn {...props} user={user}/>)
        
        }/>
        <Route path="/" exact component={Home}/>
        <Route component={NotFound}/>
      </Switch>

      <ToastContainer/>
      <Footer/>

    </BrowserRouter>
  );
}

export default Routes;

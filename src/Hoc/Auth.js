import React from "react";
import { Redirect } from "react-router-dom";
import { firebase } from '../firebase';

// guarding the routes-
// if user is authenticated- show him the page, otherwise- redirect to sign in page
const AuthGuard = (Component) => {
    // AuthHoc class receives a component, and returns a component
    class AuthHoc extends React.Component{

        authCheck = () => {
            const user = firebase.auth().currentUser;
            // if user is authenticated, return Component
            if (user) {
                return <Component {...this.props}/>
            } else {
                return <Redirect to="/sign_in"/>
            }
        }

        render(){
            return this.authCheck()
        }
    }

    return AuthHoc;
}

export default AuthGuard;
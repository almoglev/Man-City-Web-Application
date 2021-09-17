import React from "react";
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import {firebase} from '../../firebase';


import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png';

export const CityLogo = (props) => {
    const template =
    <div
        className="img_cover"
        style={{
            width: props.width,
            height: props.height,
            background: `url(${mcitylogo}) no-repeat`
        }}/>

    if(props.link){
        return(
            <Link className="link_logo" to={props.linkTo}>
                {template}
            </Link>
        )
    } else {
        return template
    }
}


export const showToastError = (msg) => {
    toast.error(msg,{
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
    })
}


export const showToastSuccess = (msg) => {
    toast.success(msg,{
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
    })
}

export const signoutHandler = ()=>{
    firebase.auth().signOut()
    .then(()=>{
        showToastSuccess("Signed out")
    }).catch(error=>{
        alert(error.message)
    })
}
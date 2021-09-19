import React from "react";
import {Link,Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import {firebase} from '../../firebase';

import {FormHelperText} from '@material-ui/core'

import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png';


// the logo of manchester city that can be reusable across the website
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


// showing toasts for errors and success
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

// signing out the user
export const signoutHandler = ()=>{
    firebase.auth().signOut()
    .then(()=>{
        showToastSuccess("Signed out")
    }).catch(error=>{
        alert(error.message)
    })

    return(
        <Redirect to="/"/>
    )
}

// a generic reusable tag
export const Tag = (props) => {
    const template = <div
        style={{
            background: props.bck ?  props.bck : '#ffffff',
            fontSize: props.size ? props.size : '15px',
            color: props.color ? props.color : '#000000',
            padding: '5px 10px',
            display: 'inline-block',
            fontFamily: 'Righteous',
            ...props.add 
        }}
    >
        {props.children}
    </div>;

    if(props.link){
        return(
            <Link to={props.linkTo}>
                {template}
            </Link>
        )
    } else{
        return template
    }
}

// will receive errors we have from formik form of add/edit player and will handle it
export const textErrorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values], 
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
})


// the function will display error on the select in case nothing is selected 
export const selectErrorHelper = (formik, values) => {
    if (formik.errors[values] && formik.touched[values]){
        return(<FormHelperText>{formik.errors[values]}</FormHelperText>)
    }
    return false
}

// checks if there's an error with the select and returns true or false accordingly 
export const selectIsError = (formik, values) => {
    return formik.errors[values] && formik.touched[values];
}
import React, {useState} from 'react';
import { firebase } from '../../firebase';
import {CircularProgress} from '@material-ui/core'
import {Redirect} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {showToastError, showToastSuccess} from '../Utils/utils'

const SignIn = (props) => {
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues:{
            email:'man_city@gmail.com',
            password:'man_city321'
        },

        validationSchema: Yup.object({
            email: Yup.string()
            .email('Invalid email address')
            .required('The email is required'),
            
            password:  Yup.string()
            .required('The password is required')
            .min(8,'Password length must be at least 8 characters')
        }),

        onSubmit:(values)=>{
            setLoading(true)
            // go to server with field values
            submitForm(values)
        }
    })

    const submitForm = (values) => {
        firebase.auth().signInWithEmailAndPassword(
            values.email,
            values.password
        ).then(()=>{
            // show success toast
            showToastSuccess('Welcome!');

            // redirect the user
            props.history.push('/dashboard')

        }).catch(error=>{
            setLoading(false);
           
            // show error toast
            showToastError("Wrong username or password");
        })
    }


    return (
        <div className="container">
            <div className="signin_wrapper" stylele={{margin: '100px'}}>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Please sign in</h2>
                    <input
                        name="email"
                        placeholder="Enter your email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />

                    <input
                        placeholder="Enter your password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    
                    { loading ? 
                        <CircularProgress color="primary" className="progress"/>
                    :   
                        <button type="submit">Log in</button>
                    }

                    {/* validating */}
                    {formik.touched.email && formik.errors.email ?
                        <div className="error_label">
                            {formik.errors.email}
                        </div>
                    : null}

                    {formik.touched.password && formik.errors.password ?
                        <div className="error_label">
                            {formik.errors.password}
                        </div>
                    : null}

                </form>

            </div>
        </div>
    )
}

export default SignIn;
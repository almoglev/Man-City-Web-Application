import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { CircularProgress } from '@material-ui/core';

import { useFormik  } from 'formik';
import * as Yup from 'yup';

import { showToastError, showToastSuccess} from '../../Utils/utils'
import {promotionsCollection} from '../../../firebase';


const EnrollForm = () => {

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {email:''},

        validationSchema: Yup.object({
            email: Yup.string()
            .email('Invalid email')
            .required('The email is required'),
        }),
        onSubmit: (values, {resetForm})=>{
            setLoading(true)
            // submit the form
            submitForm(values);
        }
    });

    const submitForm = async(values) => {
        // trying to go to firebase, wrap the values that contain the email
        // and make sure this user is not in the database
        try{
            const isOnTheList = await promotionsCollection
            .where('email','==',values.email).get();

            // if the user has already enrolled
            if(isOnTheList.docs.length > 0){
               showToastError("Sorry, you've already enrolled")
               setLoading(false)
                return false;
            }

            // enroll user
            await promotionsCollection.add({email: values.email})
            showToastSuccess("Enrolled successfully!")
            setLoading(false)
            formik.resetForm();

        } catch(error){
            showToastError(error)
            setLoading(false)
        }
    }

    return(
        <Fade>
            <div className="enroll_wrapper">
                <form onSubmit={formik.handleSubmit}>
                    <div className="enroll_title">
                        Stay updated!
                    </div>

                    <div className="enroll_input">
                        <input
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Please insert your email"
                        />

                        {formik.touched.email && formik.errors.email ?
                         <div className="error_label">{formik.errors.email}</div>
                        : null}

                        {loading ? 
                            <CircularProgress color="primary"/>
                        :
                            <button
                                type="submit"
                            >
                                Enroll
                            </button>
                        }

                        <div className="enroll_discl">
                            Be the first to know! Stay tuned with our latest updates
                            and promotions and get the chance to win.
                        </div>
                    
                    </div>
                </form>
            </div>

        </Fade>
    )
}

export default EnrollForm;
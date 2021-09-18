import React from 'react';
import Animation from './Animation';
import EnrollForm from './Enroll_form';


const Promotion = () => {
    return(
        <div className="promotion_wrapper">
            <div className="container">
                <Animation/>
                <EnrollForm/>
            </div>
        </div>
    )
}

export default Promotion;
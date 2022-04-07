import React from 'react';
import { Formik } from 'formik';


const SignupForm = () => {
    return <Formik
        initialValues={{'usernameOrEmail': 'Wtf???'}}
        onSubmit={(values, { setSubmitting }) => {
            console.log('Submit:', values, setSubmitting)
        }}
    >
        {formik => (
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor={'usernameOrEmail'}>Email or username:</label>
                <input id={'usernameOrEmail'} type={'text'} {...formik.getFieldProps('usernameOrEmail')}></input>
                <button type={'submit'}>OK</button>
            </form>
        )}
    </Formik>

}


export {SignupForm};

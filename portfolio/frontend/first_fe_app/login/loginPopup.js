import React from 'react';
import ReactDOM from 'react-dom';
import { Formik } from 'formik';
import styled, { keyframes } from 'styled-components';

import {StyledSkillCardText, BaseDiv, appearElement, BaseSpan} from '../skill_table/styledComponents.js';
import {flexBoxCss, marginCss, borderedCss} from '../base/baseStyles.js';
import {SizeTrackerHoc} from '../skill_table/sizeTracker.js';
import { SignupForm } from './loginForm.js'

import {GenericButton} from '../skill_table/genericButton.js';
import {baseUrl, skillApiBaseNameUrl, staticFolderUrl} from '../base/baseUrls.js'


const PopupContainer = styled(BaseDiv)`
	display: inline-flex;
	flex-direction: column;
	width: 40%;
	max-height: 40%;
    padding: 1px;
    background: #ececf1;
    position: fixed;
    left: 50%;
	top: 30%;
  	transform: translate(-50%, -30px);
  	border: 1px solid #9e9e9e;
  	border-radius: 10px;
`


const LoginPopup = (props) => {

    const facebookOnClick = (e) => {
        window.location = '/social_auth/login/facebook/'
    }

    const googleOnClick = (e) => {
        console.log('FC click:')
    }

    const facebookLoginButtonProps = {
        border: '0.1em solid black',
        textSizeCoefficient: 25,
        backgroundSizeCoefficient: 10,
        width: '80%',
        buttonImage: `${staticFolderUrl}icons/fcbook.png`,
        onClick: facebookOnClick,
    }

    const googleLoginButtonProps = {
        border: '0.1em solid black',
        textSizeCoefficient: 25,
        backgroundSizeCoefficient: 10,
        width: '80%',
        margin: '20px 0px 0px 0px',
        buttonImage: `${staticFolderUrl}icons/google.png`,
        onClick: googleOnClick,
    }

    const headerContainerProps = {
        flex: '1',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: '10px',
        display: 'inline-flex',
        alignItems: 'center',
        height: '100%',
        padding: '0px 0px 0px 40px'
    }

    const buttonsContainerProps = {
        flex: '3',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '0px 40px 0px 40px'
    }

    const headerFontSize = props.trackedSize > 0 ? props.trackedSize / 25 : 20

    const popup = (
        <PopupContainer height={'40%'} ref={props.trackSizeRef}>
            <BaseDiv {...headerContainerProps}>
                <BaseSpan fontFamily={"'Lato', sans-serif"} fontSize={`${Math.max(headerFontSize, 10)}px`}>Please sign in if you want to comment)</BaseSpan>
                {props.closePopupButton}
            </BaseDiv>
            <BaseDiv {...buttonsContainerProps} >
                <GenericButton {...facebookLoginButtonProps}>Sign in with Facebook</GenericButton>
                <GenericButton {...googleLoginButtonProps}>Sign in with Google</GenericButton>
            </BaseDiv>
        </PopupContainer>
    )

    return ReactDOM.createPortal(popup, document.getElementById('root'));

}

const TrackedSizeLoginPopup = SizeTrackerHoc(LoginPopup);


export {TrackedSizeLoginPopup as LoginPopup}
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { BaseDiv, BaseSpan, RouterCustomLink } from '../base/styledComponents.js';
import {SizeTrackerHoc} from '../skill_table/sizeTracker.js';

import {GenericButton} from '../skill_table/genericButton.js';
import {staticFolderUrl} from '../base/baseUrls.js'


const PopupContainer = styled(BaseDiv)`
	display: inline-flex;
	flex-direction: column;
	width: 40%;
	max-height: 40%;
    padding: 1px;
    background: #f9f9f9;
    position: fixed;
    left: 50%;
	top: 30%;
  	transform: translate(-50%, -30px);
  	border: 1px solid #9e9e9e;
  	border-radius: 10px;
    padding: 10px 40px 40px 40px;
`


const LoginPopup = (props) => {

    const facebookOnClick = (e) => {
        window.location = '/social_auth/login/facebook/'
    }

    const googleOnClick = (e) => {
        console.log('FC click:')
    }

    const baseButtonProps = {
        justifyContent: 'center',
        textSizeCoefficient: 25,
        backgroundSizeCoefficient: 10,
        width: '80%',
        margin: '20px 0px 0px 0px',
        boxShadow: '10px 5px 5px #b3b1b1',
        padding: '25px 20px 25px 0',
    }

    const facebookLoginButtonProps = {
        backgroundPosition: '5%',
        buttonImage: `${staticFolderUrl}icons/fcbook.png`,
        onClick: facebookOnClick,
        ...baseButtonProps
    }

    const googleLoginButtonProps = {
        backgroundPosition: '5%',
        buttonImage: `${staticFolderUrl}icons/google.png`,
        onClick: googleOnClick,
        ...baseButtonProps
    }

    const privacyPolicyProps = {
        onClick: props.closeLoginPopup,
        ...baseButtonProps
    }

    const headerContainerProps = {
        flex: '1',
        justifyContent: 'space-between',
        display: 'inline-flex',
        alignItems: 'center',
        height: '100%'
    }

    const buttonsContainerProps = {
        flex: '3',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
    }

    const popupContainerSize = props.trackedSize > 0 ? props.trackedSize * 6 : 400
    const headerFontSize = props.trackedSize > 0 ? props.trackedSize / 25 : 20

    const popup = (
        <PopupContainer height={`${popupContainerSize}px`} ref={props.trackSizeRef}>
            <BaseDiv {...headerContainerProps}>
                <BaseSpan fontFamily={"'Lato', sans-serif"} fontSize={`${Math.max(headerFontSize, 10)}px`}>Please sign in if you want to comment)</BaseSpan>
                {props.closePopupButton}
            </BaseDiv>
            <BaseDiv {...buttonsContainerProps} >
                <GenericButton {...facebookLoginButtonProps}>Sign in with Facebook</GenericButton>
                <GenericButton {...googleLoginButtonProps}>Sign in with Google</GenericButton>
                <GenericButton {...privacyPolicyProps}>
                    <RouterCustomLink to='/main-page/privacy-policy/'>Privacy policy</RouterCustomLink>
                </GenericButton>
            </BaseDiv>
        </PopupContainer>
    )

    return ReactDOM.createPortal(popup, document.getElementById('root'));

}

const TrackedSizeLoginPopup = SizeTrackerHoc(LoginPopup);


export {TrackedSizeLoginPopup as LoginPopup}
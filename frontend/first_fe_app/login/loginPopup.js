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
    position: fixed;
  	transform: translate(-50%, -30px);
`


const LoginPopup = (props) => {

    const facebookOnClick = (e) => {
        window.location = '/social_auth/login/facebook/'
    }

    const googleOnClick = (e) => {
        console.log('FC click:')
    }

    const popupContainerSize = window.innerWidth / 2
    const headerFontSize = props.trackedSize > 0 ? props.trackedSize / 25 : 20

    const popupContainerProps = {
        background: '#f9f9f9',
        padding: '30px 0 30px 0',
        maxHeight: `${popupContainerSize}px`,
        width: `${popupContainerSize}px`,
        left: '50%',
        top: '250px',
        border: '1px solid #9e9e9e',
  	    borderRadius: '10px',
    }

    const baseButtonProps = {
        justifyContent: 'center',
        textSizeCoefficient: 28,
        backgroundSizeCoefficient: 12,
        width: '80%',
        backgroundColor: '#e4ebf0',
        margin: '20px 0px 0px 0px',
        boxShadow: '0 0 8px #b3b1b1',
        padding: '20px 15px 20px 0',
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
        onClick: (e) => {
            window.location = '/privacy-policy/'
            props.closeLoginPopup(e)
        },
        ...baseButtonProps
    }

    const headerContainerProps = {
        flex: '1',
        justifyContent: 'space-around',
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

    const popup = (
        <PopupContainer ref={props.trackSizeRef} {...popupContainerProps}>
            <BaseDiv {...headerContainerProps}>
                <BaseSpan fontFamily={"'Lato', sans-serif"} fontSize={`${Math.max(headerFontSize, 10)}px`} textAlign={'center'}>Please sign in if you want to comment)</BaseSpan>
                {props.closePopupButton}
            </BaseDiv>
            <BaseDiv {...buttonsContainerProps} >
                <GenericButton {...facebookLoginButtonProps}>Sign in with Facebook</GenericButton>
                <GenericButton {...googleLoginButtonProps}>Sign in with Google</GenericButton>
                <GenericButton {...privacyPolicyProps}>
                    <RouterCustomLink to='/main/privacy-policy/'>Privacy policy</RouterCustomLink>
                </GenericButton>
            </BaseDiv>
        </PopupContainer>
    )

    return ReactDOM.createPortal(popup, document.getElementById('root'));

}

const TrackedSizeLoginPopup = SizeTrackerHoc(LoginPopup);


export {TrackedSizeLoginPopup as LoginPopup}
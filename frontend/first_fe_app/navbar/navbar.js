import React, { useState, useContext, useCallback } from 'react';
import {NavbarLogo, Button, NavbarText} from './styledComponents.js';
import {StyledRow, StyledCloseButton, RouterCustomLink} from '../base/styledComponents.js'
import {LoginPopup} from '../login/loginPopup.js'
import {LoginStatusContext} from '../login/loginContext.js'
import {baseUrl, staticFolderUrl} from '../base/baseUrls.js';


const NavbarButton = (props) => {
	const [highlight, setHighlight] = useState(false);
	
	const toHighlight = (e) => {
		setHighlight(true)
	}

	const unHighlight = (e) => {
		setHighlight(false)
	}

	const onClick = (e) => {
		if(props.onClick){
			props.onClick(e)
		}
		
		if(props.setClickedButtonID){
			props.setClickedButtonID(props.id)
		}
	}

	const navButtonProps = {
		marginRight: '55px',
		maxWidth: '200px', 
		justifyContent: 'center', 
		alignItems: 'center',
		borderTop: props.isClicked || highlight ? '0.3rem solid #6aabe5': '',
		onClick: onClick,
		onMouseEnter: toHighlight,
		onMouseLeave: unHighlight
	}

	return (
		<Button {...navButtonProps}>
			<NavbarText fontFamily={"'Rowdies', cursive"} fontSize={'20px'} color={props.isClicked || highlight ? '#cee8ff': '#f9f9f9'}>
				{props.children}
			</NavbarText>
		</Button>
	)
};


const Navbar = (props) => {
	const navbarPathToButtonIdMap = {
		'/main-page/about-me/': 1,
		'/main-page/tech/': 2,
		'/main-page/projects/': 3,
	}
	const [showPopup, setShowPopup] = useState(false)
	const [clickedButtonID, setClickedButtonID] = useState(navbarPathToButtonIdMap[window.location.pathname]);

	const loginCtx = useContext(LoginStatusContext)
	
	console.log('nv ctx:', loginCtx)

	const navbarContainerProps = {
		backgroundColor: '#242528',
		borderRadius: '0px 0px 10px 10px',
		justifyContent: 'flex-end',
		height: '70px'
	}

	// Navbar buttons
	const navButtonProps = {
		clickedButtonID: clickedButtonID,
		setClickedButtonID: setClickedButtonID,
	}

	// Close login button
	const showLoginPopup = (e) => {
		setShowPopup(true)
	}

	const closeLoginPopup = (e) => {
		setShowPopup(false)
	}

	const closeLoginPopupButtonProps = {
		display: 'inline-flex', 
		alignSelf: 'center', 
		marginRight: '5%',
		onClick: closeLoginPopup, 
	}

	const closeLoginPopupButton = <StyledCloseButton {...closeLoginPopupButtonProps}></StyledCloseButton>

    return (
    	<StyledRow {...navbarContainerProps}>
			<NavbarLogo src={`${staticFolderUrl}`}></NavbarLogo>
			<RouterCustomLink to='/main-page/about-me/'>
				<NavbarButton id={1} isClicked={clickedButtonID == 1} {...navButtonProps}>About Me</NavbarButton>
			</RouterCustomLink>
			<RouterCustomLink to='/main-page/tech/'>
				<NavbarButton id={2} isClicked={clickedButtonID == 2} {...navButtonProps}>Technologies</NavbarButton>
			</RouterCustomLink>
			<RouterCustomLink to='/main-page/projects/'>
				<NavbarButton id={3} isClicked={clickedButtonID == 3} {...navButtonProps}>Projects</NavbarButton>
			</RouterCustomLink>
			<NavbarButton isClicked={showPopup} onClick={showLoginPopup}>Sign in</NavbarButton>
			{showPopup ? <LoginPopup closePopupButton={closeLoginPopupButton}></LoginPopup>: null}
 		</StyledRow>
 	)
}


export {Navbar};
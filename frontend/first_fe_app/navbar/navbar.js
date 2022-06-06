import React, { useState, useContext } from 'react';
import {NavbarLogo, Button, NavbarText } from './styledComponents.js';
import {BaseDiv, StyledCloseButton, BaseImg} from '../base/styledComponents.js'
import {LoginPopup} from '../login/loginPopup.js'
import {LoginStatusContext} from '../login/loginContext.js'
import {staticFolderUrl} from '../base/baseUrls.js';


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
		marginRight: '45px',
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
			<NavbarText onClick={onClick} fontFamily={"'Rowdies', cursive"} fontSize={'20px'} color={props.isClicked || highlight ? '#cee8ff': '#f9f9f9'}>
				{props.text}
			</NavbarText>
		</Button>
	)
};


const LoggedInStatus = (props) => {
	const imageProps = {
		margin: '0 45px 0 0',
		padding: '10px',
		borderRadius: '50%',
		cursor: 'pointer',
		src: props.avatar || `${staticFolderUrl}icons/profile.png`,
	}

	return <BaseImg title={`${props.firstName} ${props.lastName}`} {...imageProps} />
}


const Navbar = (props) => {
	const navbarPathToButtonIdMap = {
		'/main/about-me/': 1,
		'/main/tech/': 2,
		'/main/projects/': 3,
	}
	const [showPopup, setShowPopup] = useState(false)
	const [clickedButtonID, setClickedButtonID] = useState(navbarPathToButtonIdMap[window.location.pathname]);

	const loginCtx = useContext(LoginStatusContext)

	const navbarContainerProps = {
		display: 'flex',
		background: 'linear-gradient(-180deg, #303030 15%, #767676)',
		borderRadius: '0px 0px 10px 10px',
		justifyContent: 'flex-end',
		height: '70px'
	}

	// Navbar buttons
	const navButtonProps = {
		clickedButtonID: clickedButtonID,
		setClickedButtonID: setClickedButtonID,
	}

	// Login button, popup
	const showLoginPopup = (e) => {
		setShowPopup(true)
	}

	const closeLoginPopup = (e) => {
		setShowPopup(false)
	}

	const closeLoginPopupButtonProps = {
		display: 'inline-flex', 
		alignSelf: 'center', 
		marginRight: '2%',
		onClick: closeLoginPopup, 
	}

	const closeLoginPopupButton = <StyledCloseButton {...closeLoginPopupButtonProps}></StyledCloseButton>

    return (
    	<BaseDiv {...navbarContainerProps}>
			<NavbarLogo src={`${staticFolderUrl}`}></NavbarLogo>
			<NavbarButton id={1} isClicked={clickedButtonID == 1} text={'About Me'} onClick={(e) => window.location = '/main/about-me/'} {...navButtonProps} />
			<NavbarButton id={2} isClicked={clickedButtonID == 2} text={'Technologies'} onClick={(e) => window.location = '/main/tech/'} {...navButtonProps} />
			<NavbarButton id={3} isClicked={clickedButtonID == 3} text={'Projects'} onClick={(e) => window.location = '/main/projects/'} {...navButtonProps} />
			{
				loginCtx.username ? 
				<LoggedInStatus {...loginCtx} /> :
				<NavbarButton isClicked={showPopup} onClick={showLoginPopup} text={'Sign in'} />
			}
			{showPopup ? <LoginPopup closePopupButton={closeLoginPopupButton} closeLoginPopup={closeLoginPopup}></LoginPopup>: null}
 		</BaseDiv>
 	)
}


export {Navbar};
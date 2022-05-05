import React, { useState, useContext, useCallback } from 'react';
import {NavbarLogo, Button, NavbarText} from './styledComponents.js';
import {StyledRow, StyledCloseButton, RouterCustomLink} from '../base/styledComponents.js'
import {LoginPopup} from '../login/loginPopup.js'
import {LoginStatusContext} from '../login/loginContext.js'
import {baseUrl, staticFolderUrl} from '../base/baseUrls.js';


const NavbarButton = (props) => {
	const [showDash, setShowDash] = useState(false);
	
	const addDashOnTop = (e) => {
		setShowDash(true);
	}

	const removeDashOnTop = (e) => {
		setShowDash(false);
	};

	const navButtonProps = {
		marginRight: '55px',
		maxWidth: '200px', 
		justifyContent: 'center', 
		alignItems: 'center',
		borderTop: showDash ? '0.3rem solid red': '',
		onClick: props.onClick,
		onMouseEnter: addDashOnTop,
		onMouseLeave: removeDashOnTop
	}

	return (
		<Button {...navButtonProps}>
			<NavbarText fontFamily={"'Rowdies', cursive"} fontSize={'20px'}>{props.children}</NavbarText>
		</Button>
	)
};


const Navbar = (props) => {
	const [showPopup, setShowPopup] = useState(false)
	const loginCtx = useContext(LoginStatusContext)
	console.log('nv ctx:', loginCtx)
	
	const showLoginPopup = (e) => {
		setShowPopup(true)
	}

	const closeLoginPopup = (e) => {
		setShowPopup(false)
	}

	const navbarContainerProps = {
		backgroundColor: '#f0f5f5',
		borderRadius: '0px 0px 10px 10px',
		justifyContent: 'flex-end',
		height: '70px'
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
				<NavbarButton>About Me</NavbarButton>
			</RouterCustomLink>
			<RouterCustomLink to='/main-page/tech/'>
				<NavbarButton>Technologies</NavbarButton>
			</RouterCustomLink>
			<RouterCustomLink to='/main-page/projects/'>
				<NavbarButton>Projects</NavbarButton>
			</RouterCustomLink>
			<NavbarButton onClick={showLoginPopup}>Sign in</NavbarButton>
			{showPopup ? <LoginPopup closePopupButton={closeLoginPopupButton}></LoginPopup>: null}
 		</StyledRow>
 	)
}


export {Navbar};
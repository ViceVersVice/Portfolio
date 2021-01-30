import React, { useState } from 'react';
import {NavbarLogo, Button, NavbarText} from './styledComponents.js';
import {StyledRow, StyledFlexInlineRow, StyledCloseButton} from '../skill_table/styledComponents.js'
import {LoginPopup} from '../login/loginPopup.js'

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

	const showLoginPopup = (e) => {
		setShowPopup(true)
	}

	const closeLoginPopup = (e) => {
		setShowPopup(false)
	}

	console.log('WTF??', showPopup)
    return (	
    	<StyledRow borderBottom={'solid 0.1rem'} justifyContent={'flex-end'} height={'70px'}>
			<NavbarLogo src={`${staticFolderUrl}`}></NavbarLogo>
			<NavbarButton>About Me</NavbarButton>
			<NavbarButton>Register</NavbarButton>
			<NavbarButton onClick={showLoginPopup}>Login</NavbarButton>
			{showPopup ? <LoginPopup closePopup={closeLoginPopup}></LoginPopup>: null}
 		</StyledRow>
 	)
}


export {Navbar};
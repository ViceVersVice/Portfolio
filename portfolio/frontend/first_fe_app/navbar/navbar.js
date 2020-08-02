import React, { useState } from 'react';
import {StyledRow, StyledFlexInlineRow, NavbarLogo, Button, NavbarText} from './styledComponents.js';


const baseUrl = window.location.origin
const staticFolderUrl = `${baseUrl}/static/`


const NavbarButton = (props) => {
	const [showDash, setShowDash] = useState(false);

	const navButtonProps = {
		marginRight: '55px',
		maxWidth: '200px', 
		justifyContent: 'center', 
		alignItems: 'center',
		borderTop: showDash ? '0.3rem solid red': ''
	}

	const addDashOnTop = (e) => {
		setShowDash(true);
	}

	const removeDashOnTop = (e) => {
		setShowDash(false);
	}


	return (
		<Button onMouseEnter={addDashOnTop} onMouseLeave={removeDashOnTop} {...navButtonProps}>
			<NavbarText fontFamily={"'Rowdies', cursive"} fontSize={'20px'}>{props.children}</NavbarText>
		</Button>
	)

}


const Navbar = () => {
    return (	
    	<StyledRow borderTop={'solid 0.1rem'} borderBottom={'solid 0.1rem'} justifyContent={'flex-end'} height={'100px'}>
    		<NavbarLogo src={`${staticFolderUrl}`}></NavbarLogo>
    		<NavbarButton>About Me</NavbarButton>
    		<NavbarButton>Register</NavbarButton>
    		<NavbarButton>Login</NavbarButton>
 		</StyledRow>
 	)
}


export {Navbar};
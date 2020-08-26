import React, { useState } from 'react';
import {NavbarLogo, Button, NavbarText} from './styledComponents.js';
import {StyledRow, StyledFlexInlineRow} from '../skill_table/styledComponents.js'
import {baseUrl, staticFolderUrl} from '../base/baseUrls.js';


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
	};

	return (
		<Button onMouseEnter={addDashOnTop} onMouseLeave={removeDashOnTop} {...navButtonProps}>
			<NavbarText fontFamily={"'Rowdies', cursive"} fontSize={'20px'}>{props.children}</NavbarText>
		</Button>
	)
};


const Navbar = () => {
    return (	
    	<StyledRow borderTop={'solid 0.1rem'} borderBottom={'solid 0.1rem'} justifyContent={'flex-end'} height={'70px'}>
    	<NavbarLogo src={`${staticFolderUrl}`}></NavbarLogo>
    		<NavbarButton>About Me</NavbarButton>
    		<NavbarButton>Register</NavbarButton>
    		<NavbarButton>Login</NavbarButton>
 		</StyledRow>
 	)
}


export {Navbar};
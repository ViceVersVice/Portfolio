import React from 'react';
import {StyledRow, StyledFlexInlineRow, NavbarLogo, NavbarButton} from './styledComponents.js';


const baseUrl = window.location.origin
const staticFolderUrl = `${baseUrl}/static/`


const Navbar = () => {
	const navButtonProps = {
		marginRight: '25px', marginTop: '20px', marginBot: '20px', 
		width: '80px', justifyContent: 'center', alignItems: 'center',
		backgroundColor: '#FFFFFF'
	}
    return (	
    	<StyledRow background={'#E8D5D5'} justifyContent={'flex-end'} height={'100px'}>
    		<NavbarLogo src={`${staticFolderUrl}`}></NavbarLogo>
    		<NavbarButton {...navButtonProps}>lololo</NavbarButton>
    		<NavbarButton {...navButtonProps}>lololo</NavbarButton>
    		<NavbarButton {...navButtonProps}>lololo</NavbarButton>
 		</StyledRow>
 	)
}


export {Navbar};
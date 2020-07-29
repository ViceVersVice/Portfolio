import styled, { keyframes, css } from 'styled-components';
import {backgroundCss, borderedCss, marginCss, flexBoxCss, sizeCss} from '../base/baseStyles.js';


const StyledRow = styled.div`
    ${flexBoxCss};
    ${sizeCss};
    display: flex;
 	background: ${props => props.background};
`


const StyledFlexInlineRow = styled.div`
	${flexBoxCss};
    display: inline-flex;
    overflow: hidden;
    background: ${props => props.background};
`


const NavbarLogo = styled.div`
	${flexBoxCss};
	display: inline-flex;
`


const NavbarButton = styled.div`
	${flexBoxCss};
	${marginCss};
	${sizeCss};
	${borderedCss};
	${backgroundCss};
	display: inline-flex;
	
`


export {StyledRow, StyledFlexInlineRow, NavbarLogo, NavbarButton};
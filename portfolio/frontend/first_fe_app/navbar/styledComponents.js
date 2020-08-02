import styled, { keyframes, css } from 'styled-components';
import {backgroundCss, borderedCss, marginCss, flexBoxCss, sizeCss, fontStyleCss} from '../base/baseStyles.js';


const StyledRow = styled.div`
    ${flexBoxCss};
    ${sizeCss};
    ${borderedCss};
    display: flex;
 	background: ${props => props.background};
`


const StyledFlexInlineRow = styled.div`
	${flexBoxCss};
	${borderedCss};
    display: inline-flex;
    overflow: hidden;
    background: ${props => props.background};
`


const NavbarLogo = styled.div`
	${flexBoxCss};
	display: inline-flex;
`


const Button = styled.div`
	${flexBoxCss};
	${marginCss};
	${sizeCss};
	${borderedCss};
	${backgroundCss};
	display: inline-flex;	
`

const NavbarText = styled.p`
	${fontStyleCss};
`


export {StyledRow, StyledFlexInlineRow, NavbarLogo, Button, NavbarText};
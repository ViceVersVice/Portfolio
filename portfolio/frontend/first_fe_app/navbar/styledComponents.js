import styled, { keyframes, css } from 'styled-components';
import {backgroundCss, borderedCss, marginCss, flexBoxCss, sizeCss, fontStyleCss} from '../base/baseStyles.js';


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
	cursor: pointer;
`

const NavbarText = styled.p`
	${fontStyleCss};
`


export {NavbarLogo, Button, NavbarText};
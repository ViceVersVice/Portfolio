import styled, { keyframes, css } from 'styled-components';
import {backgroundCss, borderedCss, marginCss, flexBoxCss} from '../base/baseStyles.js';


const StyledRow = styled.div`
    ${flexBoxCss};
    display: flex;
`


const StyledFlexInlineRow = styled.div`
	${flexBoxCss};
    display: inline-flex;
    overflow: hidden;
`


export {StyledRow, StyledFlexInlineRow};
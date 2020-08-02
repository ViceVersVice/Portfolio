import styled, { keyframes, css } from 'styled-components';
import {backgroundCss, borderedCss, marginCss, flexBoxCss, fontStyleCss} from '../base/baseStyles.js';



// Animations
const appearTopBot = keyframes`
    from {
        height: 0px;
    }

    to {
        height: 300px;
    }
`

const appearElement = keyframes`
    from {
        opacity: 0%;
    }

    to {
        opacity: 100%;
    }
`


// Components
const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px;
`


const StyledFlexColumn = styled.div`
    ${borderedCss};
    ${borderedCss};
    ${flexBoxCss};
    flex-shrink: ${props => props.flexShrink || '1'};
    flex-grow: ${props => props.flexGrow || '1'};
    background: ${props => props.backgroundColor || 'auto'};
    background-position: 100px 5px;
    box-shadow: -25px 0px 0px -22px black;
`

const StyledFlexInlineRow = styled.div`
    ${flexBoxCss};
    display: inline-flex;
    flex-grow: ${props => props.flexGrow || '1'};
    overflow: hidden;
`


const StyledFlexCardInlineRow = styled.div`
    ${borderedCss};
    ${flexBoxCss};
    display: inline-flex;
    background-color: #d8e1f4;
    margin: 30px;
    height: 400px;
    animation: ${appearElement} 1s linear;
    box-shadow: 10px 10px 4px 1px #e5e5e5;
`


const StyledSkillCardText = styled.p`
    ${marginCss};
    ${fontStyleCss};
    font-family: 'Lato', sans-serif;
    font-size: 20px;
`

const BlankColumn = styled.div`
    flex: 1;
    margin: 30px;
`


const StyledEndOfPage = styled.div`
    margin: 0 auto;
    text-align: center;
    visibility: ${props => props.isVisible};
`


const StyledImage = styled.img`
    width: 30%;
    height: 200px;
    margin-right: 30px;
    margin-left: 20px;
    margin-top: 30px;
`

const StyledHeader = styled.h1`
    ${marginCss};
`

export {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, StyledEndOfPage, StyledImage, StyledHeader}
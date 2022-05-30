import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import {backgroundCss, borderedCss, marginCss, flexBoxCss, fontStyleCss, paddingCss, sizeCss, cursorCss, fitCss, floatCss} from './baseStyles.js';
import {staticFolderUrl} from './baseUrls.js';
import { Link } from "react-router-dom";


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
const BaseDiv = styled.div`
    ${marginCss};
    ${backgroundCss};
    ${paddingCss};
    ${flexBoxCss};
    ${borderedCss};
    ${sizeCss};
    ${fontStyleCss};
    ${cursorCss};
    ${floatCss};
    left: ${props => props.left};
    top: ${props => props.top};
`


const BaseSpan = styled.span`
    ${borderedCss};
    ${fontStyleCss};
    ${marginCss};
    ${paddingCss};
    ${backgroundCss};
    ${cursorCss};
    text-align: ${props => props.textAlign};
    line-height: ${props => props.lineHeight};
    word-break: break-word;
`

const BaseIcon = styled.i`
    ${marginCss};
    ${backgroundCss};
    ${paddingCss};
    ${flexBoxCss};
    ${borderedCss};
    ${sizeCss};
    ${fontStyleCss};
    ${cursorCss};
`


const BaseImg = styled.img`
    ${marginCss};
    ${backgroundCss};
    ${paddingCss};
    ${flexBoxCss};
    ${borderedCss};
    ${sizeCss};
    ${fontStyleCss};
    ${cursorCss};
    ${fitCss};
`



const BaseParagraph = styled.p`
    ${borderedCss};
    ${marginCss};
    ${fontStyleCss};
    ${paddingCss};
    ${fontStyleCss};
    margin-block-start: ${props => props.marginBlockStart || ''};
    margin-block-end: ${props => props.marginBlockEnd || ''};
`

const BaseInput = styled.input`
    ${marginCss};
    ${backgroundCss};
    ${paddingCss};
    ${flexBoxCss};
    ${borderedCss};
    ${sizeCss};
    box-sizing: border-box;
`


const StyledRow = styled(BaseDiv)`
    display: flex;
`


const StyledFlexColumn = styled(BaseDiv)`
`


const StyledFlexInlineRow = styled(BaseDiv)`
    ${flexBoxCss};
    display: inline-flex;
    flex-grow: ${props => props.flexGrow || ''};
`


const StyledFlexCardInlineRow = styled(BaseDiv)`
    display: inline-flex;
    background-color: #f9f9f9;
    margin: 0% 1% 1% 1%;
    animation: ${appearElement} 1s linear;
    box-shadow: ${props => props.boxShadow};
    cursor: pointer;
`


const StyledSkillCardText = styled(BaseParagraph)`
    font-family: 'Lato', sans-serif;
`


const BlankColumn = styled(BaseDiv)`
    flex: 1;
    margin: 30px;
`


const StyledEndOfPage = styled(BaseDiv)`
    margin: 0 auto;
    text-align: center;
    visibility: ${props => props.isVisible};
`


const StyledSkillCardImage = styled.img`
    margin: 0 1% 0 0;
    max-width: 45%;
    max-height: 60%;
`


const StyledHeader = styled.h3`
    ${marginCss};
`


const Line = styled(BaseDiv)`
    width: 2px;
    height: 40px;
    background: black;
    transform: rotate(${props => props.rotate || ''});
`

const CrossContainer = styled(BaseDiv)`
    cursor: pointer;
    opacity: 0.3;
    &:hover {
        opacity: 1;
    }
`


const StyledCloseButton = (props) => {
    return(
        <CrossContainer {...props}>
            <Line rotate={'45deg'}></Line>
            <Line rotate={'-45deg'}></Line>
        </CrossContainer>
    )
}


const StyledButton = styled(BaseDiv)`
    display: inline-flex;
    cursor: pointer;
    width: ${props => props.width};
    justify-content: ${props => props.justifyContent || 'flex-end'};
    white-space: nowrap;
    background-repeat: no-repeat;
    background-size: ${props => props.backgroundSize || '25px'};
    background-position: ${props => props.backgroundPosition || '10%'};
    background-image: url('${props => props.buttonImage}');
`

const RouterCustomLink = (props) => {
    return (
        <Link {...props} style={{'color': 'inherit', 'textDecoration': 'inherit'}}>
            {props.children}
        </Link>
    )
}
 

export {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, 
    StyledSkillCardText, StyledEndOfPage, StyledSkillCardImage, StyledHeader, StyledButton, 
    BaseParagraph, BaseSpan, BaseInput, BaseDiv, BaseIcon, BaseImg,
    appearElement, StyledCloseButton, RouterCustomLink}
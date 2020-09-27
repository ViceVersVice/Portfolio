import styled, { keyframes, css } from 'styled-components';
import {backgroundCss, borderedCss, marginCss, flexBoxCss, fontStyleCss, paddingCss, sizeCss, cursorCss} from '../base/baseStyles.js';
import {staticFolderUrl} from '../base/baseUrls.js';


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
`


const BaseSpan = styled.span`
    ${fontStyleCss};
`


const BaseParagraph = styled.p`
    ${borderedCss};
    ${marginCss};
    ${fontStyleCss};
    ${paddingCss};
    ${fontStyleCss};
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
    background-color: #d8e1f4;
    margin: 30px;
    height: 40%;
    animation: ${appearElement} 1s linear;
    box-shadow: ${props => props.boxShadow};
    cursor: pointer;
`


const StyledSkillCardText = styled(BaseParagraph)`
    display: inline-block;
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
    margin: 5%;
    max-width: 30%;
    max-height: 60%;
`


const StyledHeader = styled.h1`
    ${marginCss};
`


const StyledCommentButton = styled(BaseDiv)`
    cursor: pointer;
    width: ${props => props.width || '30%'};
    background-repeat: no-repeat;
    background-size: ${props => props.backgroundSize || '25px'};
    background-position: 10%;
    background-image: url('${staticFolderUrl}icons/comment.svg');
`


export {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, 
    StyledSkillCardText, StyledEndOfPage, StyledSkillCardImage, StyledHeader, StyledCommentButton, 
    BaseParagraph, BaseSpan, BaseInput, BaseDiv,
    appearElement}
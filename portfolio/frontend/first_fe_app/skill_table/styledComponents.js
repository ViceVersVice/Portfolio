import styled, { keyframes, css } from 'styled-components';
import {backgroundCss, borderedCss, marginCss, flexBoxCss, fontStyleCss, paddingCss, sizeCss} from '../base/baseStyles.js';
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
const StyledRow = styled.div`
    ${marginCss};
    display: flex;
    justify-content: space-between;
    align-items: center;
`


const StyledFlexColumn = styled.div`
    ${borderedCss};
    ${borderedCss};
    ${flexBoxCss};
    flex-shrink: ${props => props.flexShrink || '1'};
    flex-grow: ${props => props.flexGrow || '1'};
    background: ${props => props.backgroundColor || ''};
    box-shadow: ${props => props.boxShadow};
    background-position: 100px 5px;
`


const StyledFlexInlineRow = styled.div`
    ${flexBoxCss};
    display: inline-flex;
    flex-grow: ${props => props.flexGrow || '1'};
    overflow: ${props => props.overflow || 'visible'};
`


const StyledFlexCardInlineRow = styled.div`
    ${borderedCss};
    ${flexBoxCss};
    ${paddingCss};
    display: inline-flex;
    background-color: #d8e1f4;
    margin: 30px;
    height: 400px;
    animation: ${appearElement} 1s linear;
    box-shadow: ${props => props.boxShadow};
    cursor: pointer;
`


const BaseParagraph = styled.p`
    ${marginCss};
    ${fontStyleCss};
    ${paddingCss};
    ${fontStyleCss};
`


const StyledSkillCardText = styled(BaseParagraph)`
    font-family: 'Lato', sans-serif;
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


const StyledSkillCardImage = styled.img`
    margin: 5%;
    width: 30%;
    height: 200px;
`


const StyledHeader = styled.h1`
    ${marginCss};
`


const StyledCommentButton = styled.div`
    ${marginCss};
    ${backgroundCss};
    ${paddingCss};
    ${flexBoxCss};
    ${borderedCss};
    ${sizeCss};
    cursor: pointer;
    width: 30%;
    background-repeat: no-repeat;
    background-size: 25px;
    background-position: 10%;
    background-image: url('${staticFolderUrl}icons/comment.svg');
`


export {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, 
    StyledSkillCardText, StyledEndOfPage, StyledSkillCardImage, StyledHeader, StyledCommentButton, BaseParagraph}
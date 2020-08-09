import styled, { keyframes, css } from 'styled-components';
import {backgroundCss, borderedCss, marginCss, flexBoxCss, fontStyleCss, paddingCss} from '../base/baseStyles.js';
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
`

const StyledSkillCardText = styled(BaseParagraph)`
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
    margin: 10% 0% 15% 15%;
    padding: 15px 50px 15px 50px;
    background-repeat: no-repeat;
    background-size: 25px;
    background-position: 10%;
    background-image: url('${staticFolderUrl}icons/comment.svg');
`
// Form components


export {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, 
    StyledSkillCardText, StyledEndOfPage, StyledSkillCardImage, StyledHeader, StyledCommentButton, BaseParagraph}
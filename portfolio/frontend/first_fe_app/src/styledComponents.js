import styled, { keyframes, css } from 'styled-components';


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


const backgroundCss = css`
    background-color: ${props => props.borderStyle};
    border-radius: ${props => props.borderRadius};
    border-left: ${props => props.borderLeft};
    border-right: ${props => props.borderRight};
`


const borderedCss = css`
    border: ${props => props.borderStyle};
    border-radius: ${props => props.borderRadius};
    border-left: ${props => props.borderLeft};
    border-right: ${props => props.borderRight};
`

const marginCss = css`
    margin-top: ${props => props.marginTop || '0'};
    margin-bottom: ${props => props.marginBot || '0'};
    margin-left: ${props => props.marginLeft || '0'};
    margin-right: ${props => props.marginRight || '0'};
`


const StyledFlexColumn = styled.div`
    ${borderedCss};
    ${marginCss};
    align-self: ${props => props.alignSelf || 'auto'};
    flex-shrink: ${props => props.flexShrink || '1'};
    flex-grow: ${props => props.flexGrow || '1'};
    background: ${props => props.backgroundColor || 'auto'};
    background-position: 100px 5px;
    box-shadow: -25px 0px 0px -22px black;
`

const StyledFlexInlineRow = styled.div`
    display: inline-flex;
    flex-direction: ${props => props.flexDirection || 'row'};
    justify-content: ${props => props.justifyContent || 'flex-start'};
    flex-grow: ${props => props.flexGrow || '1'};
    overflow: hidden;
`


const StyledFlexCardInlineRow = styled.div`
    ${borderedCss};
    display: inline-flex;
    justify-content: space-evenly;
    background-color: #d8e1f4;
    flex: 1;
    margin: 30px;
    height: 400px;
    animation: ${appearElement} 1s linear;
    box-shadow: 10px 10px 4px 1px #e5e5e5;
`


const StyledSkillCardText = styled.p`
    ${marginCss};
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
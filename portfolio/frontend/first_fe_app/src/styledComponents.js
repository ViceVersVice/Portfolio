import styled, { keyframes } from 'styled-components';


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
    align-self: ${props => props.alignSelf || 'auto'};
    flex-shrink: ${props => props.flexShrink || '1'};
    flex-grow: ${props => props.flexGrow || '1'};
    margin: ${props => props.margin || 'auto'};
    margin-top: ${props => props.marginTop || 'auto'};
    margin-bot: ${props => props.marginBot || 'auto'};
    margin-left: ${props => props.marginLeft || 'auto'};
    margin-right: ${props => props.marginRight || 'auto'};
`

const StyledFlexInlineRow = styled.div`
    display: inline-flex;
    flex-direction: ${props => props.flexDirection || 'row'};
    justify-content: ${props => props.justifyContent || 'flex-start'};
    flex-grow: ${props => props.flexGrow || '1'};
    overflow: hidden;
`


const StyledFlexCardInlineRow = styled.div`
    display: inline-flex;
    justify-content: space-evenly;
    background-color: #d8e1f4;
    flex: 1;
    margin: 30px;
    height: 400px;
    animation: ${appearElement} 1s linear;
    border: ${props => props.borderStyle};
    border-radius: ${props => props.borderRadius};
    box-shadow: 10px 10px 4px 1px #e5e5e5;
`


const StyledSkillCardText = styled.p`
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
    max-width: 50%;
    max-height: 80%;
    margin-right: 30px;
    margin-left: 20px;
`

export {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, StyledEndOfPage, StyledImage}
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
    align-self: ${props => props.alignSelf || 'auto'}
`

const StyledFlexInlineRow = styled.div`
    display: inline-flex;
    flex-direction: ${props => props.flexDirection || 'row'};
    justify-content: ${props => props.justifyContent || 'flex-start'};
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
`


const StyledSkillCardText = styled.p`
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
    max-height: 100%;
`

export {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, StyledEndOfPage, StyledImage}
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
`


const StyledFlexInlineRow = styled(StyledRow)`
    display: inline-flex;
    justify-content: center;
    background-color: yellow;
    flex: 1;
    margin: 30px;
    height: 400px;
    animation: ${appearElement} 1s linear;
`


const StyledSkillCardText = styled.p`
`

const BlankColumn = styled.div`
    flex: 1;
    margin: 30px;
`


const CloseButton = styled.button`
`

const StyledEndOfPage = styled.div`
    margin: 0 auto;
    text-align: center;
    visibility: ${props => props.isVisible};
`


export {StyledRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, StyledEndOfPage}
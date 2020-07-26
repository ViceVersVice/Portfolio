import { css } from 'styled-components';


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


const flexBoxCss = css`
    flex: ${props => props.flex || 'initial'};
    justify-content: ${props => props.justifyContent || 'flex-start'};
    align-self: ${props => props.alignSelf || 'auto'};
    flex-direction: ${props => props.flexDirection || 'row'};
`


export {backgroundCss, borderedCss, marginCss, flexBoxCss};
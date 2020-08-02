import { css } from 'styled-components';


const backgroundCss = css`
    background-color: ${props => props.backgroundColor};
`

const fontStyleCss = css`
    font-family: ${props => props.fontFamily};
    font-size: ${props => props.fontSize};
`


const borderedCss = css`
    border: ${props => props.borderStyle};
    border-radius: ${props => props.borderRadius};
    border-left: ${props => props.borderLeft};
    border-right: ${props => props.borderRight};
    border-bottom: ${props => props.borderBottom};
    border-top: ${props => props.borderTop};
`

const marginCss = css`
    margin-top: ${props => props.marginTop || '0'};
    margin-bottom: ${props => props.marginBot || '0'};
    margin-left: ${props => props.marginLeft || '0'};
    margin-right: ${props => props.marginRight || '0'};
`

const sizeCss = css`
    width: ${props => props.width || 'auto'};
    height: ${props => props.height || 'auto'};
    max-width: ${props => props.maxWidth || 'auto'};
    max-height: ${props => props.maxHeight || 'auto'};
`


const flexBoxCss = css`
    flex: ${props => props.flex || 'initial'};
    justify-content: ${props => props.justifyContent || 'flex-start'};
    align-self: ${props => props.alignSelf || 'auto'};
    align-items: ${props => props.alignItems || 'stretch'};
    flex-direction: ${props => props.flexDirection || 'row'};
`


export {backgroundCss, borderedCss, marginCss, flexBoxCss, sizeCss, fontStyleCss};
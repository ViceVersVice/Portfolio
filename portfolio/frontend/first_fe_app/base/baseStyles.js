import { css } from 'styled-components';


const backgroundCss = css`
    background-color: ${props => props.backgroundColor};
`

const fontStyleCss = css`
    font-family: ${props => props.fontFamily};
    font-size: ${props => props.fontSize};
    opacity: ${props => props.opacity};
`


const borderedCss = css`
    border: ${props => props.border};
    border-style: ${props => props.borderStyle};
    border-radius: ${props => props.borderRadius};
    border-left: ${props => props.borderLeft};
    border-right: ${props => props.borderRight};
    border-bottom: ${props => props.borderBottom};
    border-top: ${props => props.borderTop};
    box-shadow: ${props => props.boxShadow};
`

const marginCss = css`
    margin: ${props => props.margin || ''};
    margin-top: ${props => props.marginTop || ''};
    margin-bottom: ${props => props.marginBot || ''};
    margin-left: ${props => props.marginLeft || ''};
    margin-right: ${props => props.marginRight || ''};
`


const paddingCss = css`
    padding: ${props => props.padding || ''};
    padding-top: ${props => props.paddingTop || ''};
    padding-bottom: ${props => props.paddingBot || ''};
    padding-left: ${props => props.paddingLeft || ''};
    padding-right: ${props => props.paddingRight || ''};
`


const sizeCss = css`
    width: ${props => props.width || 'auto'};
    height: ${props => props.height || 'auto'};
    max-width: ${props => props.maxWidth || ''};
    max-height: ${props => props.maxHeight || ''};
`


const flexBoxCss = css`
    flex: ${props => props.flex || 'initial'};
    justify-content: ${props => props.justifyContent || 'flex-start'};
    align-self: ${props => props.alignSelf || 'auto'};
    align-items: ${props => props.alignItems || 'stretch'};
    flex-direction: ${props => props.flexDirection || 'row'};
`


export {backgroundCss, borderedCss, marginCss, flexBoxCss, sizeCss, fontStyleCss, paddingCss};
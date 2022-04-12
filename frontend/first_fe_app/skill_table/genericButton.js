import React from 'react';

import {BaseSpan, StyledButton } from '../base/styledComponents.js';
import {SizeTrackerHoc} from './sizeTracker.js';


class CustomButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'highlight': false};
        this.highlightButton = this.highlightButton.bind(this);
        this.unhighlightButton = this.unhighlightButton.bind(this);
    };

    highlightButton(e) {
        this.setState({highlight: true});
    };

    unhighlightButton(e) {
        this.setState({highlight: false});
    };

    render() {
        const textSizeCoefficient = this.props.textSizeCoefficient || 10
        const backgroundSizeCoefficient = this.props.backgroundSizeCoefficient || 7
        const buttontTextSize = this.props.trackedSize ? `${this.props.trackedSize / textSizeCoefficient}px` : '15px';
        const backgrounImageSize = this.props.trackedSize ? `${this.props.trackedSize / backgroundSizeCoefficient}px`: '25px';

        const buttonProps = {
            borderRadius: '20px',
            width: '35%',
            backgroundSize: backgrounImageSize,
            backgroundColor: 'white',
            onMouseEnter: this.highlightButton,
            onMouseLeave: this.unhighlightButton,
            ...this.props
        };
        if (this.state.highlight) {
            buttonProps.backgroundColor = this.props.highlightColor || '#d0d1d6';
        };
        
        return (
            <StyledButton ref={this.props.trackSizeRef} {...buttonProps}>
                <BaseSpan fontSize={buttontTextSize} fontFamily={"'Lato', sans-serif"} margin={'5% 10% 5% 0%'}>{this.props.children}</BaseSpan>
            </StyledButton>
        );
    };
}


const GenericButton = SizeTrackerHoc(CustomButton);


export {GenericButton};
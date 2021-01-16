import React from 'react';

import {BaseSpan, StyledButton, StyledSkillCardText} from './styledComponents.js';
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
        const buttontTextSize = this.props.trackedSize ? `${this.props.trackedSize / 10}px` : '15px';
        const backgrounImageSize = this.props.trackedSize ? `${this.props.trackedSize / 7}px`: '25px';

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
                <BaseSpan margin={'0'} fontSize={buttontTextSize} fontFamily={"'Lato', sans-serif"} margin={'5% 5% 5% 30%'}>{this.props.children}</BaseSpan>
            </StyledButton>
        );
    };
}


const GenericButton = SizeTrackerHoc(CustomButton);


export {GenericButton};
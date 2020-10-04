import React from 'react';

import {StyledButton, StyledSkillCardText} from './styledComponents.js';
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
            border: 'solid 0.1rem',
            onMouseEnter: this.highlightButton,
            onMouseLeave: this.unhighlightButton,
            backgroundSize: backgrounImageSize, 
            ...this.props
        };
        if (this.state.highlight) {
            buttonProps.backgroundColor = this.props.highlightColor || '#FFFFFF';
        };
        
        return (
            <StyledButton ref={this.props.trackSizeRef} {...buttonProps}>
                <StyledSkillCardText margin={'0'} fontSize={buttontTextSize} margin={'5% 5% 5% 35%'}>{this.props.children}</StyledSkillCardText>
            </StyledButton>
        );
    };
}


const GenericButton = SizeTrackerHoc(CustomButton);


export {GenericButton};
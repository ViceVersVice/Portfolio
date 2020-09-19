import React from 'react';

import {StyledCommentButton, StyledSkillCardText} from './styledComponents.js';


class CommentButton extends React.Component {
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
        const buttonProps = {border: 'solid 0.1rem', ...this.props};
        if (this.state.highlight) {
            buttonProps.backgroundColor = this.props.highlightColor || '#FFFFFF';
        };
        
        return (
            <StyledCommentButton onMouseEnter={this.highlightButton} onMouseLeave={this.unhighlightButton} {...buttonProps}>
                <StyledSkillCardText margin={'0'} fontSize={'15px'} margin={'5% 5% 5% 35%'}>{this.props.children}</StyledSkillCardText>
            </StyledCommentButton>
        );
    };
}


export {CommentButton};